# Nexova Solutions website

Responsive, mobile-first public landing page for Nexova Solutions. The page is implemented as a static HTML file and uses Tailwind CSS utility classes from the Tailwind CDN.

## Run locally

From the repository root, with Node.js/npm available:

```bash
npx --yes serve uis/website --listen 3000
```

Open <http://localhost:3000>. In GitHub Codespaces, open the **Ports** panel, forward port `3000` if it is not detected automatically, and change the port visibility to **Public** if the page needs to be audited externally. Codespaces generates the public URL; share that URL with the auditor. Do not publish personal or confidential information through a public port.

## Notes

- This is a static, frontend-only page; there is no backend or form delivery configured.
- The enquiry form is intentionally a demo and does not transmit information. Connect it to an approved Nexova contact workflow before collecting personal data.
- `BRIEFING.md` does not specify an application form or its fields. The candidate-interest fields in this prototype are proposed UX assumptions, not requirements stated by the briefing; confirm the field list with Nexova before treating the form as final.
- Tailwind and web fonts are loaded from CDNs, so those styling/font resources require network access.
- Company structured data uses Schema.org `Organization` markup. Company facts are based on the project briefing.
