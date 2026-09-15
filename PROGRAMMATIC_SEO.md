# AIOS programmatic SEO playbooks

The `/automation` library belongs only to `aios.ayothedoc.com`. It contains a curated set of outcome-first pages for agencies and consultants. It is not a tool-name matrix and does not publish deterministic fallback copy.

## Source files

| Path | Purpose |
|---|---|
| `data/programmatic-seo/outcomes.csv` | Outcome, Four-C layer, tier and intent seeds. |
| `data/programmatic-seo/industries.csv` | Approved audience segments. |
| `data/programmatic-seo/pages/*.json` | Reviewed page records rendered by Next.js. |
| `data/programmatic-seo/index.json` | Published manifest used by the index, sitemap and filters. |
| `scripts/programmatic_seo.py` | Claude-backed generator and quality gate. |
| `lib/programmatic-seo.ts` | Typed readers for the app. |
| `app/automation/page.tsx` | Outcome, Four-C, industry and tier index. |
| `app/automation/[slug]/page.tsx` | Detail renderer, Service schema and visible FAQPage schema. |

There is no static HTML template or `public/automation` output. Next.js is the only renderer and therefore the only canonical metadata source.

## Current editorial policy

- Outcome-first and tool-agnostic.
- Done-for-you framing, not a DIY tutorial.
- One distinct search intent per page.
- No invented client, metric, benchmark, salary, time-saving, revenue or conversion claim.
- Service targets must define eligibility, access dependencies, human handoff and failure handling.
- Expected results must be a measurement plan against the prospect's own baseline.
- No em dashes, hype phrases or unqualified absolutes.
- A failed quality gate skips the page. It never writes fallback filler.

## Commands

Install the Python dependency and supply an Anthropic key:

```bash
python -m pip install anthropic
export ANTHROPIC_API_KEY=your_key_here
```

Preview the matrix without calling a model:

```bash
python scripts/programmatic_seo.py --dry-run
python scripts/programmatic_seo.py --dry-run --limit 3
```

Generate only missing records:

```bash
python scripts/programmatic_seo.py
python scripts/programmatic_seo.py --outcome 60-second-lead-response
python scripts/programmatic_seo.py --industry "marketing agencies"
```

Overwrite only after editorial approval:

```bash
python scripts/programmatic_seo.py --force
```

Rebuild the manifest from reviewed JSON without calling Claude:

```bash
python scripts/programmatic_seo.py --rebuild-index
```

## Publishing workflow

`.github/workflows/generate-seo.yml` is intentionally manual through `workflow_dispatch`. Weekly auto-generation is paused because new pages require human review and should not expand merely because combinations exist.

The protected API endpoint `/api/generate-seo` can run the same script when `SEO_GENERATION_SECRET` and `ANTHROPIC_API_KEY` are configured. A container invocation writes to its local filesystem only. It does not commit those files back to GitHub, so the GitHub workflow is the preferred persistent generation route.

Before merging generated records:

1. Run `python scripts/programmatic_seo.py --rebuild-index`.
2. Validate every JSON file with `jq` or an equivalent parser.
3. Run `npm run typecheck` and `npm run build`.
4. Read each page for overlap, unsupported claims and buyer usefulness.
5. Confirm title and description lengths in the rendered HTML.
6. Confirm the intended CTA, Service schema, FAQ visibility and related-page links.

## Expansion rule

Do not expand the matrix until the existing set shows a distinct Search Console query pattern or a documented conversion use. Improve, consolidate or noindex overlapping pages instead of preserving thin inventory.
