# Noel Talent Services CV Audit & Optimization

A responsive, browser-only prototype built with HTML, CSS and vanilla JavaScript.

## Files
- `index.html` — app structure and content
- `styles.css` — responsive corporate styling and print layout
- `app.js` — scenario data, question flow, scoring, report, card export and interactions

## Run locally
Open `index.html` in a modern browser. For best results, run a local static server:
- Python: `python3 -m http.server 8000`
- Visit `http://localhost:8000`

No build step, npm install, API key or database is required for this first version.

## Deploy
Upload the three app files to a static host such as Netlify, GitHub Pages or Cloudflare Pages. Keep the three files in the same directory. The Google Fonts import is optional; system fonts remain as fallbacks.

## Current behaviour
- Candidate profile fields are optional except experience level and career goal.
- 12 scenario questions, with role/experience-aware question ordering.
- Each answer provides explanatory feedback and a CV tip.
- Transparent score across five dimensions: role relevance (25%), achievements and evidence (25%), structure and readability (20%), skills and adaptability (15%), application strategy (15%).
- PDF output uses the browser Print dialog. Choose “Save as PDF”.
- Results card downloads as a PNG generated in the browser.
- Copyable report summary.
- Premium enquiry opens the candidate's email app with a prefilled message to HR@noeltalents.com.
- Answers and profile data are held in page memory only. Refreshing or closing the page clears the current audit.

## Important scoring note
This is a scenario-based self-assessment, not a parser or evaluator of an actual uploaded CV. The score reflects the candidate's choices in the scenarios and should not be presented as an objective measure of CV quality or a prediction of hiring outcomes. Validate the scoring and wording with HR professionals before public launch.

## Backend requirements for future features
The core audit does not need a backend. Add one only when a real business requirement calls for it:
1. **Lead capture and email follow-ups:** a serverless function or API plus a database/CRM and an email provider. Add clear opt-in consent, unsubscribe handling, access controls and a retention policy.
2. **Persisted share links:** store a report snapshot behind an unguessable token, with expiry/revocation controls. Do not put personal details or full report contents directly in a URL.
3. **AI CV review or file upload:** a secure backend to validate file types and sizes, extract text safely, call an AI provider without exposing API keys, and delete files/text according to a disclosed retention policy. Do not send CVs to an AI provider without appropriate notice and consent.
4. **Analytics:** use privacy-respecting analytics and disclose tracking where required. Avoid collecting identifiable candidate responses unless there is a clear purpose and lawful basis.

## Production checklist
- Add Noel's approved logo and confirm exact brand colours.
- Review the scenario wording and scoring with HR specialists.
- Publish a privacy notice and consent language before collecting personal data.
- Test on current mobile and desktop browsers, keyboard navigation and screen readers.
- Test PDF print output on A4 and Letter paper.
- Consider local employment and data-protection requirements, including Nigeria's data-protection framework.
- Use a business-controlled email/CRM workflow if leads need to be recorded. A `mailto:` link does not send or store anything automatically.
