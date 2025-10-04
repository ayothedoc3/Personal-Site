import csv
import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

from google import genai
from jinja2 import Template
from slugify import slugify


class ProgrammaticSEOGenerator:
    """Generate programmatic SEO landing pages and supporting assets."""

    def __init__(self, api_key: Optional[str] = None) -> None:
        self.api_key = api_key or os.getenv("GEMINI_API_KEY", "")
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None

        # Config knobs (env-overridable)
        self.model = os.getenv("MODEL", "gemini-2.5-flash")
        self.temperature = float(os.getenv("TEMPERATURE", "0.2"))
        self.max_output_tokens = int(os.getenv("MAX_OUTPUT_TOKENS", "4096"))
        self.retry_count = int(os.getenv("RETRY_COUNT", "2"))
        self.ai_sectioned = os.getenv("AI_SECTIONED", "false").strip().lower() in {"1", "true", "yes", "y", "on"}

        self.root_dir = Path(__file__).resolve().parents[1]
        self.data_root = self.root_dir / "data" / "programmatic-seo"
        self.output_dir = self.data_root / "pages"
        self.templates_dir = self.data_root / "templates"
        self.html_output_dir = self.root_dir / "public" / "automation"

        for path in (self.data_root, self.output_dir, self.templates_dir, self.html_output_dir):
            path.mkdir(parents=True, exist_ok=True)

        self.template_path = self.templates_dir / "page_template.html"

    def create_sample_data(self) -> None:
        tools_data = [
            {"name": "n8n", "category": "workflow_automation", "description": "Open-source workflow automation"},
            {"name": "Make.com", "category": "workflow_automation", "description": "Visual automation platform"},
            {"name": "Zapier", "category": "workflow_automation", "description": "App integration platform"},
            {"name": "Airtable", "category": "database", "description": "Collaborative database platform"},
            {"name": "HubSpot", "category": "crm", "description": "Customer relationship management"},
            {"name": "Shopify", "category": "ecommerce", "description": "E-commerce platform"},
            {"name": "WordPress", "category": "cms", "description": "Content management system"},
            {"name": "Notion", "category": "productivity", "description": "All-in-one workspace"},
        ]

        use_cases_data = [
            {"name": "lead generation", "category": "marketing", "description": "Capture and qualify potential customers"},
            {"name": "social media posting", "category": "marketing", "description": "Automate social content distribution"},
            {"name": "email marketing", "category": "marketing", "description": "Automated email campaigns"},
            {"name": "customer onboarding", "category": "operations", "description": "Streamline new customer setup"},
            {"name": "invoice processing", "category": "finance", "description": "Automate billing workflows"},
            {"name": "data synchronization", "category": "operations", "description": "Keep systems in sync"},
            {"name": "reporting automation", "category": "analytics", "description": "Generate automated reports"},
            {"name": "content creation", "category": "marketing", "description": "Automate content workflows"},
        ]

        industries_data = [
            {"name": "real estate", "category": "property", "description": "Property sales and management"},
            {"name": "e-commerce", "category": "retail", "description": "Online retail businesses"},
            {"name": "law firms", "category": "legal", "description": "Legal services and practices"},
            {"name": "healthcare", "category": "medical", "description": "Medical and health services"},
            {"name": "consulting", "category": "services", "description": "Professional consulting services"},
            {"name": "SaaS companies", "category": "technology", "description": "Software as a service businesses"},
            {"name": "marketing agencies", "category": "services", "description": "Digital marketing services"},
            {"name": "restaurants", "category": "hospitality", "description": "Food service businesses"},
        ]

        for filename, rows in (
            ("tools.csv", tools_data),
            ("use_cases.csv", use_cases_data),
            ("industries.csv", industries_data),
        ):
            filepath = self.data_root / filename
            with filepath.open("w", newline="", encoding="utf-8") as handle:
                writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
                writer.writeheader()
                writer.writerows(rows)

        print("Sample data created in data/programmatic-seo")

    def create_html_template(self) -> None:
        if self.template_path.exists():
            print("Template already exists; skipping creation")
            return

        template_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ title }}</title>
    <meta name="description" content="{{ meta_description }}" />
    <link rel="canonical" href="https://ayothedoc.com/automation/{{ slug }}" />
</head>
<body>
    <main>
        <h1>{{ title }}</h1>
        <section>{{ intro_content | safe }}</section>
        <section>{{ benefits_content | safe }}</section>
        <section>{{ workflow_content | safe }}</section>
        <section>{{ steps_content | safe }}</section>
        <section>{{ results_content | safe }}</section>
        <section>{{ faq_content | safe }}</section>
    </main>
</body>
</html>
"""

        self.template_path.write_text(template_content, encoding="utf-8")
        print("Template created at", self.template_path)

    def _extract_json_text(self, raw: Optional[str]) -> Optional[str]:
        if not raw:
            return None
        text = raw.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        m = re.search(r"\{[\s\S]*\}", text)
        return m.group(0).strip() if m else (text or None)

    @staticmethod
    def _strip_fences(raw: Optional[str]) -> str:
        if not raw:
            return ""
        text = raw.strip()
        if text.startswith("```html"):
            text = text[7:]
        elif text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        return text.strip()

    def generate_content_with_ai(self, tool: str, use_case: str, industry: str) -> Dict[str, str]:
        if not self.client:
            return self.get_fallback_content(tool, use_case, industry)

        if self.ai_sectioned:
            # Try up to 2 times to get quality content
            for quality_attempt in range(2):
                content = self._generate_content_with_ai_sectioned(tool, use_case, industry)

                # Check if content is too generic
                if not self._is_content_too_generic(content, industry):
                    return content

                print(f"  ⚠️  Content too generic for {industry}, retrying... (attempt {quality_attempt + 1}/2)")

            # If still generic after retries, warn but use it
            print(f"  ⚠️  WARNING: Content for {industry} may be generic")
            return content

        prompt = f"""Create content for a programmatic SEO page about automating {use_case} for {industry} using {tool}.

Strictly follow these output rules:
- Output exactly ONE JSON object with these keys (all values must be strings):
  - intro_content: 2-3 paragraph introduction explaining the automation opportunity
  - benefits_content: HTML <ul><li> list of 3-4 benefits
  - workflow_content: 2-3 sentence workflow overview in HTML
  - steps_content: HTML <ol><li> list of 4-6 implementation steps
  - results_content: 2-3 paragraph results and ROI section
  - faq_content: 3-4 FAQ entries using <h4> for questions and <p> for answers
- Do NOT include markdown code fences, backticks, or any extra prose before/after the JSON.
- Ensure valid JSON: double-quoted keys/strings, no trailing commas, and escape quotes inside strings.
"""

        required_keys = [
            "intro_content",
            "benefits_content",
            "workflow_content",
            "steps_content",
            "results_content",
            "faq_content",
        ]

        for attempt in range(self.retry_count + 1):
            try:
                response_schema = None
                try:
                    Schema = genai.types.Schema  # type: ignore[attr-defined]
                    Type = genai.types.Type      # type: ignore[attr-defined]
                    response_schema = Schema(
                        type=Type.OBJECT,
                        properties={k: Schema(type=Type.STRING) for k in required_keys},
                        required=required_keys,
                    )
                except Exception:
                    response_schema = None

                response = self.client.models.generate_content(
                    model=self.model,
                    contents=f"You are a helpful assistant that generates SEO content in JSON format.\n\n{prompt}",
                    config=genai.types.GenerateContentConfig(
                        temperature=self.temperature,
                        max_output_tokens=self.max_output_tokens,
                        response_mime_type="application/json",
                        **({"response_schema": response_schema} if response_schema else {}),
                    ),
                )

                response_text = getattr(response, "text", None)
                response_text = self._extract_json_text(response_text)
                if not response_text:
                    raise ValueError("Empty response from model")

                content_data = json.loads(response_text)

                missing_or_invalid = False
                for key in required_keys:
                    if key not in content_data or not isinstance(content_data.get(key), str) or not content_data.get(key, "").strip():
                        missing_or_invalid = True
                        break

                if missing_or_invalid:
                    fallback = self.get_fallback_content(tool, use_case, industry)
                    for key in required_keys:
                        val = content_data.get(key)
                        if not isinstance(val, str) or not val.strip():
                            content_data[key] = fallback[key]

                for key in required_keys:
                    if not isinstance(content_data.get(key), str):
                        content_data[key] = str(content_data.get(key, ""))

                return content_data
            except Exception as exc:
                if attempt < self.retry_count:
                    continue
                print(f"Error generating AI content: {exc}")
                return self.get_fallback_content(tool, use_case, industry)

    @staticmethod
    def get_fallback_content(tool: str, use_case: str, industry: str) -> Dict[str, str]:
        return {
            "intro_content": (
                f"<p>Automating {use_case} gives {industry} teams a predictable way to remove manual busywork. "
                f"With {tool}, you can launch reliable workflows in days instead of months.</p>"
                f"<p>This guide walks through the exact playbook we deploy for clients who want measurable impact fast.</p>"
            ),
            "benefits_content": (
                "<ul>"
                f"<li>Eliminate low-value tasks inside your {industry} workflow</li>"
                f"<li>Launch automations in {tool} without heavy engineering</li>"
                f"<li>Improve data accuracy across every {use_case} touchpoint</li>"
                f"<li>Create dashboards that prove ROI to stakeholders</li>"
                "</ul>"
            ),
            "workflow_content": (
                f"<p>Connect your core apps to {tool}, trigger on critical {use_case} events, and sync results back to your "
                f"{industry} team in real time.</p>"
            ),
            "steps_content": (
                "<ol>"
                f"<li>Audit current {use_case} tasks and dependencies</li>"
                f"<li>Map required integrations inside {tool}</li>"
                f"<li>Build and test core workflow automations</li>"
                "<li>Deploy guardrails, notifications, and reporting</li>"
                f"<li>Train your {industry} team and iterate weekly</li>"
                "</ol>"
            ),
            "results_content": (
                f"<p>Teams typically reclaim 10-20 hours per month after launching this automation.</p>"
                "<p>You will also capture cleaner data to improve forecasting and downstream campaigns.</p>"
            ),
            "faq_content": (
                f"<h4>How long does it take to implement?</h4><p>Most {tool} builds launch in 2-3 weeks.</p>"
                "<h4>Do we need engineers?</h4><p>No. Power users can manage these automations with templates.</p>"
                f"<h4>Can it scale?</h4><p>{tool} supports enterprise-grade throughput with role-based access.</p>"
            ),
        }

    @staticmethod
    def strip_html(html: str) -> str:
        return re.sub(r"<[^>]+>", "", html)

    @staticmethod
    def estimate_read_time(blocks: Iterable[str]) -> int:
        words = sum(len(ProgrammaticSEOGenerator.strip_html(block).split()) for block in blocks)
        return max(1, round(words / 200))

    def load_data_files(self) -> Dict[str, List[Dict[str, str]]]:
        datasets: Dict[str, List[Dict[str, str]]] = {}
        for filename in ("tools.csv", "use_cases.csv", "industries.csv"):
            filepath = self.data_root / filename
            if not filepath.exists():
                raise FileNotFoundError(f"Missing data file: {filepath}")
            with filepath.open(encoding="utf-8") as handle:
                datasets[filename.split(".")[0]] = list(csv.DictReader(handle))
        return datasets

    def _generate_content_with_ai_sectioned(self, tool: str, use_case: str, industry: str) -> Dict[str, str]:
        keys_and_instructions = {
            "intro_content": (
                f"Write a 2-3 paragraph introduction explaining how {industry} teams struggle with manual {use_case} "
                f"and how automating this process with {tool} solves their specific pain points. "
                f"Include industry-specific challenges, terminology, and workflows relevant to {industry}. "
                "Use HTML <p> tags. No generic templates. No markdown, no JSON."
            ),
            "benefits_content": (
                f"Return HTML <ul> with 4 <li> benefits specific to using {tool} for {use_case} in {industry}. "
                f"Each benefit must include <strong>bold headers</strong> and concrete examples relevant to {industry}. "
                "Avoid generic phrases like 'Eliminate low-value tasks' - be specific to the industry. "
                "HTML only, no markdown, no JSON."
            ),
            "workflow_content": (
                f"Provide a detailed 3-4 sentence workflow overview explaining exactly how {tool} automates {use_case} "
                f"for {industry} teams, including specific tools they typically use (e.g., CRMs, marketing platforms). "
                "Use HTML <p> tags. Be specific, not generic. No markdown, no JSON."
            ),
            "steps_content": (
                f"Return an HTML <ol> with 5-6 detailed implementation steps showing how to set up {tool} for "
                f"{use_case} in {industry}. Each step must include <strong>bold headers</strong> and specific actions "
                f"relevant to {industry} workflows, tools, and processes. "
                "Avoid generic steps. HTML only, no markdown, no JSON."
            ),
            "results_content": (
                f"Write a 2 paragraph results/ROI section explaining the measurable impact of automating {use_case} "
                f"with {tool} for {industry} teams. Include time savings, efficiency gains, and revenue impact "
                f"specific to {industry} operations. Be concrete with metrics and outcomes. "
                "Use HTML <p> tags. No markdown, no JSON."
            ),
            "faq_content": (
                f"Return 3-4 FAQ entries as repeating blocks of <h4>Question</h4><p>Answer</p>. "
                f"Questions must address specific concerns {industry} professionals have about using {tool} for {use_case}. "
                f"Include at least one question about industry-specific compliance, security, or integration challenges. "
                "Make answers detailed and helpful. HTML only, no markdown, no JSON."
            ),
        }

        content: Dict[str, str] = {}
        for key, instruction in keys_and_instructions.items():
            section_prompt = (
                f"You are a helpful assistant. Generate only the requested HTML snippet (no markdown, no JSON).\n\n"
                f"Context: Automating {use_case} for {industry} using {tool}.\n"
                f"Task: {instruction}"
            )

            text_value: str = ""
            for attempt in range(self.retry_count + 1):
                try:
                    resp = self.client.models.generate_content(
                        model=self.model,
                        contents=section_prompt,
                        config=genai.types.GenerateContentConfig(
                            temperature=self.temperature,
                            max_output_tokens=max(512, min(self.max_output_tokens, 2048)),
                            response_mime_type="text/plain",
                        ),
                    )
                    text_value = self._strip_fences(getattr(resp, "text", ""))
                    if text_value and isinstance(text_value, str):
                        break
                except Exception:
                    if attempt < self.retry_count:
                        continue
            if not text_value:
                text_value = self.get_fallback_content(tool, use_case, industry)[key]
            content[key] = text_value

        return content

    def _is_content_too_generic(self, content: Dict[str, str], industry: str) -> bool:
        """Check if generated content is too generic/templated"""
        # Check for generic phrases that indicate low-quality content
        generic_phrases = [
            "Automating .* gives .* teams a predictable way",
            "This guide walks through the exact playbook",
            "Eliminate low-value tasks inside your .* workflow",
            "Most .* builds launch in 2-3 weeks",
            "Teams typically reclaim 10-20 hours",
        ]

        combined_text = " ".join(content.values())

        # If content has multiple generic phrases, it's probably templated
        generic_count = sum(1 for phrase in generic_phrases if re.search(phrase, combined_text, re.IGNORECASE))
        if generic_count >= 3:
            return True

        # Check if industry name appears in content (industry-specific content should mention it)
        industry_mentions = combined_text.lower().count(industry.lower())
        if industry_mentions < 3:  # Should mention industry at least 3 times
            return True

        return False

    def generate_all_pages(self, limit: Optional[int] = None) -> None:
        datasets = self.load_data_files()

        template: Optional[Template] = None
        if self.template_path.exists():
            template = Template(self.template_path.read_text(encoding="utf-8"))

        combos: List[Dict[str, Dict[str, str]]] = []
        for tool in datasets["tools"]:
            for use_case in datasets["use_cases"]:
                for industry in datasets["industries"]:
                    combos.append({"tool": tool, "use_case": use_case, "industry": industry})

        if limit:
            combos = combos[:limit]

        print(f"Generating {len(combos)} pages...")

        for combo in combos:
            tool = combo["tool"]
            use_case = combo["use_case"]
            industry = combo["industry"]

            tool_name = tool["name"]
            use_case_name = use_case["name"]
            industry_name = industry["name"]

            try:
                content = self.generate_content_with_ai(tool_name, use_case_name, industry_name)
                # Derive structured FAQ items from HTML for JSON-LD
                try:
                    faq_html = content.get("faq_content", "") or ""
                    pairs = re.findall(r"<h4[^>]*>(.*?)</h4>\s*<p[^>]*>(.*?)</p>", faq_html, flags=re.S | re.I)
                    faq_items = []
                    for q, a in pairs:
                        q_clean = self.strip_html(q)
                        a_clean = self.strip_html(a)
                        faq_items.append({"q": q_clean.strip(), "a": a_clean.strip()})
                    content["faq_items"] = faq_items
                except Exception:
                    content["faq_items"] = []

                slug = "-".join(
                    (slugify(tool_name), slugify(use_case_name), slugify(industry_name))
                )
                title = f"{tool_name} for {use_case_name.title()} in {industry_name.title()}"
                meta_description = (
                    f"Learn how {tool_name} automates {use_case_name} for {industry_name} teams with a complete workflow."
                )
                date_published = datetime.utcnow().isoformat()
                read_time = self.estimate_read_time(content.values())
                intro_plain = self.strip_html(content.get("intro_content", ""))
                excerpt = intro_plain.split(". ")[0].strip() if intro_plain else ""

                page_payload: Dict[str, Any] = {
                    "slug": slug,
                    "title": title,
                    "metaDescription": meta_description,
                    "tool": tool_name,
                    "useCase": use_case_name,
                    "industry": industry_name,
                    "datePublished": date_published,
                    "readTime": read_time,
                    "excerpt": excerpt,
                    "sections": {
                        "intro": content.get("intro_content", ""),
                        "benefits": content.get("benefits_content", ""),
                        "workflow": content.get("workflow_content", ""),
                        "steps": content.get("steps_content", ""),
                        "results": content.get("results_content", ""),
                        "faq": content.get("faq_content", ""),
                    },
                    "source": {
                        "tool": tool,
                        "use_case": use_case,
                        "industry": industry,
                    },
                }

                json_path = self.output_dir / f"{slug}.json"
                json_path.write_text(json.dumps(page_payload, indent=2, ensure_ascii=False), encoding="utf-8")

                if template is not None:
                    html_content = template.render(
                        title=title,
                        meta_description=meta_description,
                        slug=slug,
                        tool=tool_name,
                        use_case=use_case_name,
                        industry=industry_name,
                        date_published=date_published,
                        **content,
                    )
                    html_path = self.html_output_dir / f"{slug}.html"
                    html_path.write_text(html_content, encoding="utf-8")

                print(f"Generated page for {slug}")
            except Exception as exc:
                print(f"Failed to create page for {tool_name} / {use_case_name} / {industry_name}: {exc}")

        self.generate_manifest()
        self.generate_sitemap()

    def generate_manifest(self) -> None:
        manifest_path = self.data_root / "index.json"
        pages: List[Dict[str, Any]] = []
        for json_file in sorted(self.output_dir.glob("*.json")):
            try:
                try:
                    content = json_file.read_text(encoding="utf-8")
                except UnicodeDecodeError:
                    print(f"Encoding issue with {json_file.name}, trying latin-1")
                    content = json_file.read_text(encoding="latin-1")
                    json_file.write_text(content, encoding="utf-8")

                payload = json.loads(content)
                pages.append(
                    {
                        "slug": payload.get("slug", json_file.stem),
                        "title": payload.get("title", ""),
                        "metaDescription": payload.get("metaDescription", ""),
                        "tool": payload.get("tool"),
                        "useCase": payload.get("useCase"),
                        "industry": payload.get("industry"),
                        "excerpt": payload.get("excerpt", ""),
                        "readTime": payload.get("readTime", 3),
                        "datePublished": payload.get("datePublished"),
                    }
                )
            except (json.JSONDecodeError, UnicodeDecodeError) as exc:
                print(f"Skipping invalid file {json_file.name}: {exc}")

        manifest_path.write_text(json.dumps({"pages": pages}, indent=2, ensure_ascii=False), encoding="utf-8")
        print("Manifest written to", manifest_path)

    def generate_sitemap(self) -> None:
        sitemap_path = self.html_output_dir / "sitemap.xml"
        urls = []
        for json_file in sorted(self.output_dir.glob("*.json")):
            slug = json_file.stem
            url_block = [
                "    <url>",
                f"        <loc>https://ayothedoc.com/automation/{slug}</loc>",
                f"        <lastmod>{datetime.utcnow().strftime('%Y-%m-%d')}</lastmod>",
                "        <changefreq>monthly</changefreq>",
                "        <priority>0.7</priority>",
                "    </url>",
            ]
            urls.append("\n".join(url_block))

        sitemap_xml = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "\n".join(urls)
            + "\n</urlset>"
        )
        sitemap_path.write_text(sitemap_xml, encoding="utf-8")
        print("Sitemap published at", sitemap_path)


def main(limit: Optional[int] = None) -> None:
    generator = ProgrammaticSEOGenerator()
    generator.create_sample_data()
    generator.create_html_template()
    generator.generate_all_pages(limit=limit)


if __name__ == "__main__":
    main(limit=10)


