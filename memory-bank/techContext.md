# Technical Context

## Repository and Current Stack

This repository is a starter monorepo for Nexova's AI Engineering project. It currently provides folder conventions and documentation rather than a runnable company application.

- The root README describes intended areas for user interfaces (`uis/`), a centralized API (`services/`), datasets and pipelines (`data/`), AI agents and tools (`agents/`), automation (`workflows/`), shared code (`packages/`), and infrastructure (`infra/`). These are repository conventions, not a deployed Nexova architecture.
- `packages/shared/` contains a private TypeScript package named `@repo/shared-types`, with its entry point at `types/index.ts`.
- The repository includes a Python data-analysis skill script using pandas.
- No root workspace runner or implemented application backend is currently configured. The README recommends a centralized FastAPI backend, but that is guidance, not an implementation decision already made for this project.

## Application Placement

- `/uis/website/` is the canonical location for Nexova's public corporate website.
- `/uis/backoffice/` is the canonical location for internal applications. The initial recruiter-facing candidate-search workflow belongs here as a backoffice feature, not as a separate parallel frontend application.
- `/services/` contains company backend APIs and background workers. The root README recommends starting with one centralized company API and adding a separately running worker only when there is a concrete need.
- These paths define where future implementations belong; they do not imply that the application directories already exist. Do not create parallel root-level `apps/`, `frontend/`, `backend/`, or `server/` trees or split the same product across extra application roots.

## Nexova's Existing Systems

The company briefing identifies HubSpot, legacy Zendesk, Google Workspace, a home-built applicant-tracking system from the early 2010s, and spreadsheets as disconnected business tools. Nexova has no centralized telemetry or logging, and deployments are manual. For the selected talent-search work, the legacy ATS is a likely candidate-data source, but its schema, export/access path, data quality, and integration options have not been verified. Do not design an integration around assumptions about those details.

## Architectural Direction

The planned initial capability is recruiter-facing semantic search over candidate profiles, grounded in criteria from client recruitment briefings (such as B2B sales experience and C1 English). Nexova's 40 selection consultants currently screen 30 to 80 CVs per search, communicate by individual email, and lack real-time candidate status visibility. The MVP should help consultants find and inspect relevant profile evidence; candidate interviews, communications, and placement remain human-controlled. Keep the first implementation focused and use existing monorepo boundaries: user interaction in `uis/`, API logic in `services/`, approved candidate data and evaluation material in `data/`, and model-facing behavior in `agents/` if an agent is needed. The framework, model provider, vector store, ingestion design, and deployment approach remain undecided until the legacy ATS data path and MVP are scoped.

## Constraints and Design Requirements

- Candidate profiles contain sensitive personal data. Establish approved source data, permitted use, client boundaries, access, retention, and minimization/anonymization requirements before ingestion; do not assume the legacy ATS can be accessed or integrated.
- Retrieval and ranking must support selection consultants in the existing client-brief-to-CV-screening workflow; do not make automated hiring, rejection, interview, or placement decisions.
- Show traceable evidence from candidate profiles for matches and evaluate retrieval against recruitment criteria with relevance labels reviewed by consultants.
- Do not use protected personal characteristics as matching criteria, and do not expose raw CVs or direct identifiers in evaluation reports.
- Avoid introducing a distributed or microservice architecture without a demonstrated need; the repository guide recommends one centralized API to keep early complexity low.
- Do not infer production infrastructure from the template. There is no configured root workspace runner or runnable application described by the current README, and no new application framework has been selected.

## Source of Truth

Use `BRIEFING.md` as the authoritative source for Nexova's business processes, existing tools, and constraints. `CONTEXT.md` is now a Nexova-specific summary derived from that briefing. `company-choice.md` records the intended focus on talent selection and candidate-database RAG.
