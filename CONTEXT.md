# Nexova Solutions Context

This project uses the company and operating context in [`BRIEFING.md`](./BRIEFING.md). That briefing is the source of truth if any summary here differs.

## Company

Nexova Solutions is a human-resources consulting and talent-acquisition firm founded in 2011. It is headquartered in Valencia, Spain, with an expansion office in Miami, Florida. It has about 120 employees and serves mostly mid-sized technology, retail, and financial-services companies. Its business lines are executive and mid-management recruitment, outsourced customer-support teams, and corporate training.

## Talent Selection Operations

Talent Selection is Nexova's core business. Forty selection consultants manage recruitment from client briefing through CV screening, interviews, and placement. Screening is currently manual, with each consultant reading 30 to 80 CVs for a search. Candidate communication is sent through individual emails, candidate status is not visible in real time, and matching depends heavily on consultant judgment. The company needs AI-assisted CV scoring and ranking, semantic search over candidate profiles, a candidate status portal, and templated status communication.

The initial project focus is recruiter-facing semantic search over candidate profiles, for example finding candidates with B2B sales experience and C1 English. Results must include evidence a consultant can inspect; a model must not make hiring decisions.

## Other Business Processes

- **Corporate Training:** a quarterly PDF catalogue, Google Forms, and spreadsheets handle enrolment and attendance; programme recommendations and learner progress are not personalized or centrally tracked.
- **Customer Support Outsourcing:** 30 agents support clients over phone, email, and chat. Knowledge is in a shared Word document, average resolution is 48 hours against a 24-hour SLA, and supervisors lack live workload visibility.
- **Sales:** 18 people use HubSpot inconsistently; SDR prospecting and follow-up are mostly manual, and only about 40% of the team updates the CRM consistently.
- **Internal HR:** a four-person team manages queries, leave, onboarding, and reviews largely through email, spreadsheets, and Google Forms.
- **Marketing:** the 2019 website is slow and inaccessible; content is manual and conversion measurement is limited.
- **Executive reporting:** department heads prepare weekly PDFs manually, taking 4 to 8 hours per manager; leadership receives stale, non-unified information.

## Existing Technology and Constraints

Nexova's business tools are disconnected: HubSpot, a legacy Zendesk helpdesk, Google Workspace, a home-built applicant-tracking system dating from the early 2010s, and spreadsheets. There is no centralized telemetry or logging, and deployments are manual. The candidate-data schema, export/access path, and integration options for the legacy ATS have not yet been established; do not assume them.

Candidate records are sensitive. Use only approved, appropriately minimized data; preserve client boundaries; make matching explainable; and keep candidate outcomes under human control. The repository's application framework, model provider, vector store, and deployment architecture remain undecided.

_Esta información también está disponible en [español](./CONTEXT.es.md)._
