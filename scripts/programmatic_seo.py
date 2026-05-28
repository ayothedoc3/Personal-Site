#!/usr/bin/env python3
"""
Programmatic SEO generator for the Ayothedoc AIOS Playbooks library.

What this does
--------------
Reads data/programmatic-seo/outcomes.csv and data/programmatic-seo/industries.csv
and produces one page JSON per outcome x industry combo into
data/programmatic-seo/pages/, then refreshes data/programmatic-seo/index.json.

Each generated page is an "AIOS playbook" written for the done-for-you offer,
tool-agnostic, tagged with its Four-C layer and tier, and on-brand voice
(no em dashes, no hype). Bespoke non-industry pages (e.g. the speed-to-lead
explainer cluster) are curated by hand and live alongside the generated ones.

How to run
----------
  pip install anthropic
  export ANTHROPIC_API_KEY=...               # or use the BYOK store via the app
  python scripts/programmatic_seo.py         # generate any missing combos
  python scripts/programmatic_seo.py --outcome 60-second-lead-response
  python scripts/programmatic_seo.py --industry "marketing agencies"
  python scripts/programmatic_seo.py --force                     # overwrite
  python scripts/programmatic_seo.py --dry-run                   # list combos only
  python scripts/programmatic_seo.py --rebuild-index             # only refresh index.json

The generator never produces fallback / templated content. If the model output
trips the quality gate, the page is skipped and logged, never written. This is
the explicit "no thin pages" rule from the realignment plan.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "programmatic-seo"
PAGES_DIR = DATA / "pages"
OUTCOMES_CSV = DATA / "outcomes.csv"
INDUSTRIES_CSV = DATA / "industries.csv"
INDEX_PATH = DATA / "index.json"

# Default model. Overridable via env. Skill guidance: default to the latest /
# most capable Claude. Move to sonnet if you want to trade quality for cost.
MODEL = os.getenv("AUDIT_CLAUDE_MODEL", "claude-opus-4-7")
MAX_TOKENS = int(os.getenv("AIOS_GEN_MAX_TOKENS", "8000"))

# ICP industries the pillar tier covers. Other industries can be generated for
# capability and wedge tiers, but the pillar (AI Operating System) is only
# meaningful for the ICP set.
ICP_INDUSTRIES = {"marketing agencies", "consulting firms", "web design agencies"}

SYSTEM_PROMPT = """You are the AI Operating System (AIOS) architect for Ayothedoc.

Ayothedoc installs and runs a done-for-you AI Operating System for small businesses, agencies, and consulting firms. It is built on four layers, the Four Cs:
- Context: the system knows the business, its offers, voice, and priorities.
- Connections: it plugs into the tools the business already runs on (email, calendar, CRM, billing, docs) and works from live data.
- Capabilities: done-for-you workflows that draft, route, summarize, follow up, and report.
- Cadence: it runs on a schedule without being asked, so work happens while the owner is away.

The wedge offer is the free 60-Second Lead Engine: every new lead is answered in under 60 seconds, in the owner's voice, with their booking link.

You are writing one page in the AIOS playbooks library on ayothedoc.com. Each page is a single combination of (outcome, Four-C layer, tier, industry).

Voice rules (strict):
- Never use em dashes or en dashes. Use commas, periods, or the word "to" for ranges.
- Plain, direct, and honest. No hype. Never use "fully automated", "revolutionary", "game-changing", "cutting-edge", "unlock", "transform your business", or exclamation-heavy copy.
- Brand stance: least AI necessary, the simplest reliable workflow, boring is beautiful, and the owner always owns the system.
- Tool-agnostic. Talk about outcomes and which Four-C layer this sits in. You may refer to generic categories (CRM, inbox, calendar) but never prescribe a specific tool brand. Do not say "use Zapier, Make, or n8n".

Content rules:
- The page is written for the prospect, not about them. Second person.
- Sections (every page has all six):
  1. intro: the problem in their industry (or generally if no industry) plus what the AIOS does. Wrap in <p> tags.
  2. fourCFit: how this fits in the wider AIOS, name the Four-C layer explicitly, link to other layers if useful. Use <ul><li> for the layer list.
  3. whatDoneLooksLike: the artifact and SLA, specific and concrete. Use <ul><li>.
  4. howWeInstall: the 3-phase install: Audit (free, about 10 minutes), Install (10 business days), Operate (ongoing, one new automation per week). Include links: <a href='/audit'>Run the audit</a>, <a href='/offer'>See plans</a>. Use <ol><li>.
  5. expectedResults: real ranges grounded in the inputs, plus the standing guarantee (recover 40 or more hours a month or we keep working free until you do). Use <ul><li>.
  6. faq: exactly 3 questions and answers. Use <h4>question</h4><p>answer</p> per pair.

Other:
- All section values are HTML strings.
- Use single quotes inside HTML attributes so the JSON does not require escaping (e.g. <a href='/audit'>).
- Word count per page across all sections: 600 to 1000.
- readTime: integer minutes, conservative (about 200 words per minute).
- excerpt: one or two sentence summary, 140 to 200 chars.
- metaDescription: 140 to 160 chars, written for SERP.
- title: the page's exact title, including the industry if applicable.

Output a JSON object matching the schema. Nothing else."""

PAGE_SCHEMA: Dict[str, Any] = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "metaDescription": {"type": "string"},
        "excerpt": {"type": "string"},
        "readTime": {"type": "integer"},
        "sections": {
            "type": "object",
            "properties": {
                "intro": {"type": "string"},
                "fourCFit": {"type": "string"},
                "whatDoneLooksLike": {"type": "string"},
                "howWeInstall": {"type": "string"},
                "expectedResults": {"type": "string"},
                "faq": {"type": "string"},
            },
            "required": ["intro", "fourCFit", "whatDoneLooksLike", "howWeInstall", "expectedResults", "faq"],
            "additionalProperties": False,
        },
    },
    "required": ["title", "metaDescription", "excerpt", "readTime", "sections"],
    "additionalProperties": False,
}

# Phrases that mean the model fell back to template-speak. Reject and log.
QUALITY_BLOCKERS = [
    "fully automated",
    "revolutionary",
    "game-changing",
    "game changing",
    "cutting-edge",
    "cutting edge",
    "unlock the power",
    "transform your business",
]


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def strip_dashes(value: Any) -> Any:
    if isinstance(value, str):
        return value.replace("—", ", ").replace("–", "-")
    if isinstance(value, dict):
        return {k: strip_dashes(v) for k, v in value.items()}
    if isinstance(value, list):
        return [strip_dashes(v) for v in value]
    return value


def load_csv(path: Path) -> List[Dict[str, str]]:
    with path.open() as f:
        return [row for row in csv.DictReader(f)]


def page_path(slug: str) -> Path:
    return PAGES_DIR / f"{slug}.json"


def page_exists(slug: str) -> bool:
    return page_path(slug).exists()


def quality_ok(payload: Dict[str, Any]) -> Tuple[bool, Optional[str]]:
    """True if content is good enough to publish. Otherwise returns the reason."""
    blob = json.dumps(payload).lower()
    for phrase in QUALITY_BLOCKERS:
        if phrase in blob:
            return False, f"hype phrase: {phrase!r}"
    if "—" in blob or "–" in blob:
        return False, "contains em or en dash"
    sections = payload.get("sections", {})
    total_chars = sum(len(str(sections.get(k, ""))) for k in (
        "intro", "fourCFit", "whatDoneLooksLike", "howWeInstall", "expectedResults", "faq"
    ))
    if total_chars < 2500:
        return False, f"too thin ({total_chars} chars across sections)"
    return True, None


def build_user_prompt(outcome: Dict[str, str], industry: Optional[Dict[str, str]], tier: str) -> str:
    industry_line = (
        f"Industry: {industry['name']}\nIndustry description: {industry.get('description', '')}"
        if industry
        else "Industry: not applicable (this is a non-industry wedge page)"
    )
    title_hint = (
        f"{outcome['name']} for {industry['name'].title() if industry else ''}".strip()
        if tier != "pillar"
        else f"AI Operating System for {industry['name'].title()}"
        if industry
        else outcome["name"]
    )
    return f"""Write the AIOS playbook page for this combination:

Outcome: {outcome['name']}
Four-C layer: {outcome['four_c']}
Tier: {tier}
Outcome intent keywords: {outcome.get('intent', '')}
{industry_line}

Suggested title: {title_hint}

Remember: no em dashes, no hype words, tool-agnostic, done-for-you framing, all 6 sections as HTML strings, follow the schema exactly.
"""


def call_claude(client, outcome: Dict[str, str], industry: Optional[Dict[str, str]], tier: str) -> Dict[str, Any]:
    user_prompt = build_user_prompt(outcome, industry, tier)
    resp = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}],
        messages=[{"role": "user", "content": user_prompt}],
        output_config={"format": {"type": "json_schema", "schema": PAGE_SCHEMA}},
    )
    # First text block is the structured-output JSON string.
    text = ""
    for block in resp.content:
        if getattr(block, "type", "") == "text":
            text = block.text
            break
    if not text:
        raise RuntimeError("Claude returned no text content")
    return json.loads(text)


def render_page_record(
    outcome: Dict[str, str],
    industry: Optional[Dict[str, str]],
    tier: str,
    payload: Dict[str, Any],
) -> Dict[str, Any]:
    industry_name = industry["name"] if industry else None
    slug_parts = [slugify(outcome["slug"])]
    if industry_name:
        slug_parts.append(slugify(industry_name))
    slug = "-".join(slug_parts)

    # Always strip dashes from the model output once more as belt-and-suspenders.
    payload = strip_dashes(payload)

    record: Dict[str, Any] = {
        "slug": slug,
        "title": payload["title"],
        "metaDescription": payload["metaDescription"],
        "outcome": outcome["name"],
        "fourC": outcome["four_c"],
        "tier": tier,
        "industry": industry_name,
        "tool": None,
        "useCase": None,
        "datePublished": datetime.now(timezone.utc).isoformat(),
        "readTime": payload.get("readTime") or 4,
        "excerpt": payload["excerpt"],
        "sections": payload["sections"],
    }
    return record


def write_page(record: Dict[str, Any]) -> Path:
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    path = page_path(record["slug"])
    path.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    return path


def rebuild_index() -> int:
    """Scan PAGES_DIR and write index.json. Returns the count."""
    pages: List[Dict[str, Any]] = []
    for json_path in sorted(PAGES_DIR.glob("*.json")):
        try:
            page = json.loads(json_path.read_text(encoding="utf-8"))
        except Exception as exc:
            print(f"  ! skipping malformed {json_path.name}: {exc}", file=sys.stderr)
            continue
        pages.append({
            "slug": page["slug"],
            "title": page["title"],
            "metaDescription": page.get("metaDescription", ""),
            "outcome": page.get("outcome", ""),
            "fourC": page.get("fourC", ""),
            "tier": page.get("tier", "capability"),
            "industry": page.get("industry"),
            "tool": page.get("tool"),
            "excerpt": page.get("excerpt", ""),
            "readTime": page.get("readTime"),
            "datePublished": page.get("datePublished"),
        })
    # Sort by tier rank then title for a stable, browseable order.
    tier_rank = {"pillar": 0, "wedge": 1, "capability": 2}
    pages.sort(key=lambda p: (tier_rank.get(p.get("tier", "capability"), 99), p["title"].lower()))
    INDEX_PATH.write_text(json.dumps({"pages": pages}, indent=2) + "\n", encoding="utf-8")
    return len(pages)


def iter_combos(
    outcomes: List[Dict[str, str]],
    industries: List[Dict[str, str]],
    only_outcome: Optional[str],
    only_industry: Optional[str],
):
    for outcome in outcomes:
        if only_outcome and outcome["slug"] != only_outcome and outcome["name"].lower() != only_outcome.lower():
            continue
        tier = outcome.get("tier", "capability")
        for industry in industries:
            if only_industry and industry["name"].lower() != only_industry.lower():
                continue
            # Pillar tier only fires for ICP industries: keeps the matrix honest.
            if tier == "pillar" and industry["name"].lower() not in ICP_INDUSTRIES:
                continue
            yield outcome, industry, tier


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate AIOS playbook pages.")
    parser.add_argument("--outcome", help="Limit to one outcome (slug or name)")
    parser.add_argument("--industry", help="Limit to one industry (name)")
    parser.add_argument("--limit", type=int, default=0, help="Cap how many pages to generate (0 = no cap)")
    parser.add_argument("--force", action="store_true", help="Overwrite existing pages")
    parser.add_argument("--dry-run", action="store_true", help="List the combos that would be generated and exit")
    parser.add_argument("--rebuild-index", action="store_true", help="Only refresh index.json from existing pages")
    args = parser.parse_args()

    if args.rebuild_index:
        count = rebuild_index()
        print(f"index.json refreshed with {count} pages")
        return 0

    outcomes = load_csv(OUTCOMES_CSV)
    industries = load_csv(INDUSTRIES_CSV)
    combos = list(iter_combos(outcomes, industries, args.outcome, args.industry))
    if args.limit:
        combos = combos[: args.limit]

    if args.dry_run:
        print(f"Would generate {len(combos)} combos:")
        for outcome, industry, tier in combos:
            print(f"  {tier:<11} {outcome['slug']:<32} x {industry['name']}")
        return 0

    try:
        import anthropic
    except ImportError:
        print("Missing dep: pip install anthropic", file=sys.stderr)
        return 1

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("Set ANTHROPIC_API_KEY before running.", file=sys.stderr)
        return 1
    client = anthropic.Anthropic(api_key=api_key)

    written = 0
    skipped = 0
    failed = 0
    for outcome, industry, tier in combos:
        slug_parts = [slugify(outcome["slug"]), slugify(industry["name"])]
        slug = "-".join(slug_parts)
        if page_exists(slug) and not args.force:
            print(f"  - exists, skipping: {slug}")
            skipped += 1
            continue

        print(f"  > generating: {slug}")
        try:
            payload = call_claude(client, outcome, industry, tier)
        except Exception as exc:
            print(f"  ! generation failed for {slug}: {exc}", file=sys.stderr)
            failed += 1
            continue

        ok, reason = quality_ok(payload)
        if not ok:
            print(f"  ! quality gate failed for {slug}: {reason}", file=sys.stderr)
            failed += 1
            continue

        record = render_page_record(outcome, industry, tier, payload)
        path = write_page(record)
        print(f"  + wrote {path.relative_to(ROOT)}")
        written += 1

    count = rebuild_index()
    print(f"\nDone. wrote={written} skipped={skipped} failed={failed} index={count}")
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
