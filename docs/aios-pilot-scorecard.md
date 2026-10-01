# AIOS completed-pilot scorecard

Internal template. Do not publish until a completed pilot has real measurements,
supporting records and permission to share the approved scope of information.
The repository currently contains no completed-pilot dataset or client quote.

## Public report template

- Pilot: [approved client name or anonymized description]
- Measurement period: [start and end dates, timezone]
- Environment: [live traffic or controlled test; report each separately]
- Scope: [one inbound source, integrations, reply and handoff workflow]
- Eligibility: [written inclusion and exclusion rules]
- Sample: [total enquiries observed; eligible enquiries tested; excluded enquiries and reasons]
- Response target: [agreed seconds and conditions]
- Timing definition: [source event timestamp to first successfully delivered eligible reply]

| Measure | Observed result | Denominator and evidence |
| --- | --- | --- |
| Eligible enquiries tested | [count] | [source records and eligibility rules] |
| Replies within agreed target | [count / eligible enquiries requiring a reply] | [delivery timestamps; count failures as misses] |
| Median / p95 response time | [seconds] | [sample size and calculation method] |
| Correct routing | [correct / enquiries requiring routing] | [expected destination versus observed destination] |
| Correct human handoff | [correct / enquiries requiring handoff] | [recipient, required context and acknowledgement criteria] |
| Exceptions | [count, categories, resolved/unresolved] | [exception log] |
| Failures | [count, categories and impact] | [failed delivery, routing, handoff or alert records] |

### What worked

[Observed findings, with records supporting each statement.]

### What failed and what changed

[Exceptions, unresolved limits, fixes and any retest results. Keep original and
retest measurement periods separate.]

### Decision

[Stop, continue focused scope, or separately scope paid managed operations.]

## Evidence and publication rules

1. Agree eligibility, targets and acceptance criteria before the test.
2. Include all eligible events, including failures. Do not remove slow responses
   to improve averages. Distinguish test enquiries from genuine customer traffic.
3. Keep timestamps, expected outcomes, observed outcomes and exception records.
   State missing data. Use counts alongside percentages; use N/A for zero denominators.
4. Do not infer revenue, saved hours or booking uplift from technical success.
   Only publish those outcomes when directly measured with a documented baseline.
5. Obtain permission for quotes, client identity, logos and screenshots. Remove
   personal lead data, credentials and internal account identifiers.
6. Publish the approved report in the AIOS blog with Article image, dates,
   author and canonical metadata, then link it from the homepage trust section
   and `/offer`. Do not present healthcare prototypes as paid AIOS client results.
