# Content Verification Required

Everything below is on the `healthcare-repositioning` branch and NOT deployed.
Confirm or correct each item before merging to production. Nothing here is
presented publicly until you do.

## Founder credentials (app/about + /ayo)
Stated on the site, confirm each is accurate and how you want it worded:
- [ ] "Physician-trained" and "Doctor of Medicine (MD) degree"
- [ ] "Postgraduate public-health training"
- [ ] LinkedIn URL used: `https://www.linkedin.com/in/ayokunle-ademola-john` (confirm exact handle)
- NOT claimed anywhere (kept out on purpose): active medical licensure, US licensure, board certification, hospital privileges, clinical services, regulatory authority. Keep it that way.

## Case studies (lib/case-studies.ts) — all `verified: false`
None are shown publicly until you set `verified: true`. Each needs you to confirm
it exists and replace the generic descriptions with real detail. Metrics are
"Not measured" by default; add real metrics only where you have evidence.
- [ ] ExerScript, Healthcare AI Hackathon Pilot, confirm it exists + real details
- [ ] FHIR-enabled workflow prototype, confirm + real details
- [ ] Medical-device usability study, confirm + real details
- [ ] Add any other real, accurately labelled projects
Until `verified: true`, the homepage "Selected work" section is hidden and the
Case Studies index shows an honest "being prepared" state.

## Insights (lib/insights.ts)
Three original educational explainer articles were written (no fabricated
claims, clients or metrics). Review for accuracy/voice; edit or add freely.
- [ ] Hospital-readiness assessment explainer
- [ ] FHIR / interoperability explainer
- [ ] Human factors / device adoption explainer

## African market entry (who-we-help/africa-market-entry)
Page explicitly states we do NOT claim regulatory representation, legal advice,
guaranteed procurement, government access, distributor networks or market
approval. Confirm you are comfortable with the wording; do not add any such
claim without evidence.

## Contact + mailboxes
- [ ] `hello@ayothedoc.com` (healthcare form receiving) exists and is monitored
- [ ] `aios@ayothedoc.com` (AIOS terms/contact) exists and is monitored
If either does not exist, tell me and I will point to a working address until it does.

## CV download
- The `/ayo` page currently offers "Discuss a Professional Opportunity" (mailto),
  not a "Download CV" button, because no CV file exists in the repo.
- [ ] To enable a real CV download, provide the PDF and I will add the button.

## Legal pages
- Privacy and Terms were made host-aware, but the text is boilerplate and marked
  for professional legal review. Governing law for the healthcare entity is left
  to the engagement agreement (AIOS keeps Lithuania).
- [ ] Have Privacy, Terms and the Medical Disclaimer reviewed by a qualified
  professional for your jurisdiction(s) before relying on them.

## Visual assets
- [ ] `/og-image.jpg` is currently the shared OG image. Consider a healthcare-
  specific OG image for the root site.
