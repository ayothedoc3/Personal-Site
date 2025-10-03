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

    def generate_content_with_ai(self, tool: str, use_case: str, industry: str) -> Dict[str, str]:
        if not self.client:
            return self.get_fallback_content(tool, use_case, industry)

        prompt = f"""Create content for a programmatic SEO page about automating {use_case} for {industry} using {tool}.

Return valid JSON with the following keys:
intro_content: 2-3 paragraph introduction explaining the automation opportunity
benefits_content: HTML <ul><li> list of 3-4 benefits
workflow_content: 2-3 sentence workflow overview in HTML
steps_content: HTML <ol><li> list of 4-6 implementation steps
results_content: 2-3 paragraph results and ROI section
faq_content: 3-4 FAQ entries using <h4> for questions and <p> for answers
"""

        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash-exp",
                contents=f"You are a helpful assistant that generates SEO content in JSON format.\n\n{prompt}",
                config=genai.types.GenerateContentConfig(
                    temperature=0.7,
                    max_output_tokens=2000,
                    response_mime_type="application/json"
                )
            )

            return json.loads(response.text)
        except Exception as exc:
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

                slug = "-".join(
                    (slugify(tool_name), slugify(use_case_name), slugify(industry_name))
                )
                title = f"{tool_name} for {use_case_name.title()} in {industry_name.title()}"
                meta_description = (
                    f"Learn how {tool_name} automates {use_case_name} for {industry_name} teams with a complete workflow."
                )
                date_published = datetime.utcnow().isoformat()
                read_time = self.estimate_read_time(content.values())
                intro_plain = self.strip_html(content["intro_content"])
                excerpt = intro_plain.split(". ")[0].strip()

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
                        "intro": content["intro_content"],
                        "benefits": content["benefits_content"],
                        "workflow": content["workflow_content"],
                        "steps": content["steps_content"],
                        "results": content["results_content"],
                        "faq": content["faq_content"],
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
                # Try reading with UTF-8, fallback to latin-1 if needed
                try:
                    content = json_file.read_text(encoding="utf-8")
                except UnicodeDecodeError:
                    print(f"Encoding issue with {json_file.name}, trying latin-1")
                    content = json_file.read_text(encoding="latin-1")
                    # Re-save with proper UTF-8 encoding
                    json_file.write_text(content, encoding="utf-8")

                payload = json.loads(content)
                pages.append(
                    {
                        "slug": payload["slug"],
                        "title": payload["title"],
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
