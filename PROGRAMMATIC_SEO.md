# Programmatic SEO Playbooks

This repository now supports a programmatic SEO pipeline that generates automation playbooks and exposes them through the `/automation` route in the Next.js app.

## Data Sources

All programmatic data lives in `data/programmatic-seo/`:

- `tools.csv`, `use_cases.csv`, `industries.csv` � seed datasets that define the combinatorial content space.
- `pages/*.json` � generated detail records for each playbook.
- `index.json` � manifest of published playbooks consumed by the Next.js routes.
- `templates/page_template.html` � HTML template used when producing static landing pages in `public/automation/`.

## Next.js Integration

- `app/automation/page.tsx` renders the automation library with filter chips for tool, use case, and industry. It reads summaries from `lib/programmatic-seo.ts`.
- `app/automation/[slug]/page.tsx` renders individual playbooks with full content, structured data markup, and related recommendations.
- `lib/programmatic-seo.ts` exposes helpers to load summaries, detail records, and filter metadata from the filesystem using cached async functions.

## Content Generation Script

The generator lives in `scripts/programmatic_seo.py`. It can:

1. Seed the CSV datasets (`create_sample_data`).
2. Ensure the HTML template exists (`create_html_template`).
3. Generate JSON records and optional static HTML pages (`generate_all_pages`).
4. Create a manifest and sitemap so the static exports can be deployed.

### Running the generator

```bash
# Optional: set your Anthropic key for AI-generated copy
export ANTHROPIC_API_KEY=sk-ant-...

# Generate 10 playbooks as a smoke test
python scripts/programmatic_seo.py
```

Without an API key the script falls back to deterministic template content so development is reproducible.

### Adding new data

1. Append rows to the CSVs or drop new JSON files into `data/programmatic-seo/pages`.
2. Update `index.json` with a summary entry for anything you want the site to list.
3. Re-run the generator (optional) to rebuild `index.json`, regenerate HTML, and refresh the sitemap.

## Deployment & Scheduling

### Option 1: GitHub Actions (Recommended)
The repository includes `.github/workflows/generate-seo.yml` that runs weekly:
- Executes every Sunday at midnight UTC
- Generates new content automatically
- Commits and pushes changes to trigger deployment
- **Setup**: Add `ANTHROPIC_API_KEY` to GitHub Secrets

### Option 2: Coolify Cron Job
Use the `Dockerfile.generator` which includes Python:
1. Deploy with this Dockerfile
2. In Coolify → Scheduled Tasks: `0 0 * * 0 cd /app && python3 scripts/programmatic_seo.py`
3. Add `ANTHROPIC_API_KEY` environment variable

### Option 3: API Endpoint
Trigger generation via HTTP POST to `/api/generate-seo`:
```bash
curl -X POST https://yourdomain.com/api/generate-seo \
  -H "Authorization: Bearer YOUR_SECRET_TOKEN"
```
- Set `SEO_GENERATION_SECRET` in environment variables
- Call from external cron services (cron-job.org, EasyCron, etc.)

### Notes
- Keep `index.json` in sync with the available `pages/*.json` files
- Static HTML in `public/automation/` can be uploaded to a CDN
- Regeneration triggers automatic Next.js rebuild on push (Coolify watches git)

## Further Ideas

- Wire the library into a headless CMS or Airtable so non-technical teammates can curate new playbooks.
- Add analytics tracking to the playbook CTAs to understand which tools and industries convert best.
- Use the generator output to feed sitemap submissions or paid landing page experiments.
