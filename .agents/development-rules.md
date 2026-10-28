# Development Rules

## Candidate Search Fits Talent Selection Operations

**Scope:** Always active

Nexova's 40 selection consultants take a client recruitment brief through CV screening, interviews, and placement; they currently review 30 to 80 CVs per search. For any candidate-search or matching feature, use only approved candidate data and criteria from the client brief, show traceable profile evidence for each match, and keep the result assistive. Do not infer protected characteristics or let an automated score/rank accept, reject, or advance a candidate. A consultant owns all candidate decisions and placement.

The existing candidate system is a home-built ATS from the early 2010s. Do not assume its schema, access method, or data quality; verify those with the developer before designing ingestion or integration.

## Keep Applications In Canonical Monorepo Paths

**Scope:** Always active

- Put the public corporate website in `/uis/website/` and internal operational UI in `/uis/backoffice/`. The current recruiter-facing candidate-search workflow belongs in the backoffice, not in a newly invented parallel frontend application.
- Put backend APIs and background workers under `/services/`. Start with the centralized company API recommended by the root README; create a separately running worker only when the workflow requires it.
- Do not add parallel root-level application trees such as `/apps/`, `/frontend/`, `/backend/`, or `/server/`. These are canonical destinations, not a request to create empty directories; only add files when implementing an approved feature.
