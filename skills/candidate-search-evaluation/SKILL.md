---
name: candidate-search-evaluation
description: Evaluate Nexova recruiter semantic-search results against consultant-reviewed recruitment criteria and relevance labels, producing a reproducible retrieval-quality report.
---

# Candidate Search Evaluation

## Objective

Evaluate one batch of Nexova recruiter semantic-search results against consultant-reviewed recruitment criteria and relevance labels, and produce a reproducible report of retrieval quality. Nexova's 40 selection consultants currently screen 30 to 80 CVs per search as part of a process that runs from client briefing through interviews and placement. This skill measures search behavior only; it must not recommend whether a person should be hired, rejected, interviewed, or advanced.

## When to Use

Use this skill when a Nexova selection consultant or project developer needs to compare a candidate-search run with an evaluation set derived from client recruitment criteria and whose relevance labels have already been reviewed by a selection consultant.

## Inputs

Provide these inputs:

1. `queries.jsonl`: one JSON object per search query with a unique `query_id`, the recruiter `query`, a non-empty `search_criteria` array derived from the client recruitment brief, and `relevant_profile_ids`, the pseudonymous profile IDs judged relevant by a selection consultant.
2. `results.jsonl`: one JSON object per query with `query_id` and an ordered `results` array. Each result has a `profile_id`, a 1-based `rank`, and non-sensitive `evidence_refs` identifying the candidate-profile fields or source fragments that support retrieval.
3. Optional evaluation configuration: `k`, the cutoff for top-k metrics (default `5`), and optional metric thresholds chosen by the project team. Never invent thresholds.

The canonical source system is Nexova's home-built ATS from the early 2010s, but its schema and approved export/access path are not yet verified. Normalize an approved dataset into these inputs only after that access is confirmed; do not assume direct ATS integration. Keep client datasets separated and use only criteria authorized for the evaluated search.

Example `queries.jsonl` record:

```json
{"query_id":"q-001","query":"B2B sales experience and C1 English","search_criteria":["B2B sales experience","English C1"],"relevant_profile_ids":["cand-103","cand-221"]}
```

Example `results.jsonl` record:

```json
{"query_id":"q-001","results":[{"profile_id":"cand-221","rank":1,"evidence_refs":["experience.sales","language.english_level"]}]}
```

Use pseudonymous profile IDs only. Do not provide names, contact details, full CVs, client-identifying information, or other direct personal data. Do not use protected attributes as relevance criteria. Keep each client's candidate records isolated throughout evaluation.

## Procedure

1. Confirm the search criteria come from the evaluated client recruitment brief, relevance labels were reviewed by a selection consultant, and profile IDs are pseudonymous.
2. Validate that query IDs are unique, each query has non-empty criteria and at least one judged-relevant profile, and every query has exactly one result record.
3. Validate that each result list has unique profile IDs, ranks are contiguous starting at 1, and every returned result includes at least one `evidence_ref`.
4. If validation fails, report each issue and stop metric calculation; do not silently repair or infer labels.
5. Calculate metrics per query and macro-average them across the query set:
   - `Precision@k` = relevant retrieved profiles in the first k positions / k.
   - `Recall@k` = relevant retrieved profiles in the first k positions / all judged-relevant profiles for the query.
   - `MRR` = reciprocal rank of the first relevant retrieved profile, or 0 if none is retrieved.
6. Produce a concise report with the input counts, validation outcome, per-query metrics, macro averages, any configured threshold comparisons, and limitations. Do not make a hiring recommendation.

For queries with fewer than k returned results, retain k as the Precision@k denominator so scores remain comparable across queries.

## Acceptance Criteria

The evaluation is complete only when all of the following are true:

- Every query has a unique ID, non-empty criteria from its client recruitment brief, a non-empty consultant-reviewed relevance set, and exactly one corresponding result record.
- Every result list has unique profile IDs, contiguous 1-based ranks, and a non-empty evidence reference for each result.
- The report includes Precision@k, Recall@k, and MRR for every query and their macro averages, using the configured k or the default of 5.
- Any configured thresholds are compared explicitly; no unconfigured pass threshold is invented.
- Validation errors are reported without calculating or presenting aggregate metrics as valid.
- The evaluation uses approved, pseudonymized data with client boundaries preserved; the report contains no direct personal data.
- The report evaluates retrieval quality only and makes no hiring, rejection, interview, or candidate-advancement decision.

Report status as `PASS` when these acceptance criteria are met, otherwise `FAIL` with the unmet criteria listed. A `PASS` means the evaluation report is complete and valid; it does not mean the search system meets a quality threshold unless the project team configured one.
