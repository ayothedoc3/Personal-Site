# AIOS readiness audit setup

The `/audit` flow belongs to `aios.ayothedoc.com`. It stores the lead, fetches a limited amount of text from the submitted public website, asks Claude for a structured Four-Cs readiness report and sends that report through Resend when delivery is configured.

## Required production configuration

```env
# Claude report generation
ANTHROPIC_API_KEY=your_key_here
# Optional model override
AUDIT_CLAUDE_MODEL=claude-opus-4-7

# Report email
RESEND_API_KEY=your_key_here
AUDIT_FROM_EMAIL=AIOS by Ayothedoc <audit@your_verified_domain>

# Primary lead persistence, use the repository's documented Postgres variables
DATABASE_URL=your_postgres_url

# Optional notification
AUDIT_SLACK_WEBHOOK_URL=your_webhook_url
```

An Anthropic key may also be stored through the admin secret store. The code checks that source before the environment variable. Airtable remains an optional persistence fallback through `AIRTABLE_BASE_ID`, `AIRTABLE_API_KEY` and `AIRTABLE_TABLE_NAME`.

Do not rely on the final local JSON fallback in a production container. Container storage may be replaced during deployment.

## Safety controls

- Zod validates input types, lengths and URL syntax.
- Requests are limited to three per IP in a 30-minute in-memory window.
- Request bodies larger than 32 kB are rejected.
- Submitted website URLs must resolve to public HTTP or HTTPS destinations.
- Private, loopback, link-local and metadata-service destinations are blocked before each redirect.
- Website responses have a timeout, content-type check and 512 kB limit.
- Submitted page content is treated as untrusted source material in the model prompt.
- User fields inserted into email HTML are escaped.
- No time or dollar saving is estimated from website text. The preview states that a measured baseline is required.
- Delivery messages report whether email actually sent instead of promising an email on failure.

The rate limiter is process-local and resets on deployment. Use a shared edge or datastore-backed limit if abuse volume warrants it.

## Test checklist

1. Submit a normal public HTTPS site and confirm a preview is returned.
2. Confirm the lead is stored in Postgres.
3. Confirm the report is received from the verified `AUDIT_FROM_EMAIL` address.
4. Temporarily test without Resend and verify the UI says the request was saved for manual follow-up.
5. Test rejected URLs such as `http://127.0.0.1`, `http://169.254.169.254` and a non-HTML download.
6. Confirm repeated submissions return HTTP 429 after the configured threshold.
7. Review generated reports for unsupported claims, prompt leakage and correct Four-Cs classification.
8. Verify `lead_form_start` and `generate_lead` in GA4 DebugView.

Never use a real person's website or email in a test without permission. Use an owned domain and a monitored test inbox.
