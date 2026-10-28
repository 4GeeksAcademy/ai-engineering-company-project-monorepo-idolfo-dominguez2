# Progress

## Current State

- Nexova Solutions is the selected company, headquartered in Valencia, Spain, with an expansion office in Miami, Florida. `BRIEFING.md` is the source of truth; `CONTEXT.md` now summarizes its company and process details.
- Talent Selection is the initial project focus. Forty consultants manually screen 30 to 80 CVs per search; candidate matching is judgment-led, communication is by individual email, and clients lack real-time status visibility.
- Nexova's business tools include a home-built ATS from the early 2010s, HubSpot, legacy Zendesk, Google Workspace, and spreadsheets. The ATS data schema and approved access/export path have not been verified.
- The monorepo remains a starter template: folder guides, a shared TypeScript types package, and a Python pandas skill exist, but no runnable company application or root workspace runner is configured.
- No retrieval stack, model provider, vector store, application framework, or deployment target has been selected.

## Planned Next Steps

1. Verify the approved access/export path, schema, data quality, and client boundaries for candidate records in the legacy ATS before choosing an ingestion design.
2. Define the recruiter MVP around search criteria from client briefings, profile evidence, and the existing CV-review workflow; keep interviews and placement decisions human-controlled.
3. Set candidate-data minimization, access, retention, and de-identification rules before using real records.
4. Build a consultant-reviewed evaluation set and measure retrieval relevance with documented metrics.
5. Select the smallest API, retrieval, and UI components that fit the verified data path; leave unrelated department workflows out of the initial scope.
