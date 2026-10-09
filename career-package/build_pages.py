"""Convert portfolio/projects/*.md and portfolio/samples/*.md into static HTML pages.

Run from anywhere:  python career-package/build_pages.py
Needs:              pip install markdown
Each foo.md gets a foo.html next to it, styled by portfolio/style.css (section 16, ".doc").
The .md files stay the source of truth: edit them, re-run this script, commit, publish.
"""
import html
import re
from pathlib import Path

import markdown

PORTFOLIO = Path(__file__).resolve().parent / "portfolio"
FOLDERS = ("projects", "samples")

FAVICON = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E"
    "%3Crect width='32' height='32' rx='7' fill='%23050911'/%3E"
    "%3Cpath d='M8 17l5 5 11-12' fill='none' stroke='%23c8ff00' stroke-width='3' "
    "stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
)

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | Plamen Tanev</title>
  <meta name="description" content="{description}">
  <meta name="theme-color" content="#050911">
  <link rel="stylesheet" href="../style.css">
  <link rel="icon" href="{favicon}">
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="../index.html" aria-label="Plamen Tanev, portfolio home">
        <span class="brand-name">Plamen Tanev</span>
        <span class="brand-role">Senior QA Engineer · Remote · EU / EMEA</span>
      </a>
      <a class="neon-button button-secondary doc-back" href="../index.html#{anchor}">&larr; Back to portfolio</a>
    </div>
  </header>

  <main class="container doc">
    <article class="doc-body">
{body}
    </article>
    <p class="doc-foot"><a class="neon-button button-secondary" href="../index.html#{anchor}">&larr; Back to portfolio</a>
      <a class="neon-button button-secondary" href="../PlamenTanevAiQA_Cv.pdf" download="PlamenTanevAiQA_Cv.pdf">Download CV</a></p>
  </main>

  <footer>
    <div class="container">&copy; 2026 Plamen Tanev · Static page, no trackers.</div>
  </footer>
</body>
</html>
"""

BARE_URL = re.compile(r"(?<![\(<\"'\[`=])(https?://[^\s<>)`\]]+)")


def autolink(md_text: str) -> str:
    """Wrap bare URLs in <...> so they become links. Skips fenced code blocks."""
    out, in_fence = [], False
    for line in md_text.split("\n"):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
        if not in_fence:
            line = BARE_URL.sub(lambda m: "<" + m.group(1).rstrip(".,;:") + ">" + m.group(1)[len(m.group(1).rstrip(".,;:")):], line)
        out.append(line)
    return "\n".join(out)


def convert(md_path: Path, folder: str) -> str:
    text = md_path.read_text(encoding="utf-8")
    body = markdown.markdown(autolink(text), extensions=["tables", "fenced_code", "sane_lists"])

    # relative links to other .md pages become links to their .html twin
    body = re.sub(r'href="((?!https?:|mailto:|#)[^"]+?)\.md(#[^"]*)?"', r'href="\1.html\2"', body)
    # external links open in a new tab
    body = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" target="_blank" rel="noopener noreferrer"', body)
    # task list items: "- [ ] text" / "- [x] text"
    body = re.sub(r"<li>\[ \] ", '<li class="task"><input type="checkbox" disabled> ', body)
    body = re.sub(r"<li>\[[xX]\] ", '<li class="task"><input type="checkbox" checked disabled> ', body)
    # scrollable tables on narrow screens
    body = body.replace("<table>", '<div class="table-wrap"><table>').replace("</table>", "</table></div>")

    heading = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S)
    title = html.unescape(re.sub(r"<[^>]+>", "", heading.group(1))) if heading else md_path.stem
    first_p = re.search(r"<p>(.*?)</p>", body, re.S)
    description = html.unescape(re.sub(r"<[^>]+>", "", first_p.group(1))) if first_p else title
    description = " ".join(description.split())[:190]

    indented = "\n".join("      " + line if line else line for line in body.split("\n"))
    return PAGE.format(
        title=html.escape(title),
        description=html.escape(description, quote=True),
        favicon=FAVICON,
        anchor="projects" if folder == "projects" else "samples",
        body=indented,
    )


def main() -> None:
    count = 0
    for folder in FOLDERS:
        for md in sorted((PORTFOLIO / folder).glob("*.md")):
            out = md.with_suffix(".html")
            out.write_text(convert(md, folder), encoding="utf-8", newline="\n")
            print(f"{md.relative_to(PORTFOLIO)} -> {out.name}")
            count += 1
    print(f"{count} pages written")


if __name__ == "__main__":
    main()
