# Portfolio

A static portfolio: plain HTML, CSS and a little JavaScript. No build step, no framework, no external requests (fonts are the system fonts, the favicon is inline).

## Open it locally

Double-click `index.html`, or from PowerShell:

```powershell
Start-Process .\index.html
```

Optional local server (any one of these):

```powershell
python -m http.server 8000     # then open http://localhost:8000
```

## Files

| File | Purpose |
|---|---|
| `index.html` | The page: hero, about, strengths, manual, automation, API, AI-assisted QA, projects, work samples, tools, contact |
| `style.css` | Design tokens at the top (`:root`), dark theme, responsive rules |
| `script.js` | Mobile menu, footer year, subtle reveal, active nav link, and the Areas of Expertise cards (pause idle animation off screen, pointer tilt). The page works without it |
| `gallery.js` | The Projects gallery: the editable `projects` list, the details dialog and the generated scene artwork. Without JavaScript the section shows a plain list of the case studies and repositories |
| `samples.js` | The Work Samples cards: network canvas, drag handle, tilt, and the dialog where a sample can be read, edited, copied or downloaded. It holds a copy of the text of `samples/*.md`. Without JavaScript each card is a plain link to its `.md` file |
| `about.js` | The About section's interaction: drag handles on the nine workflow cards, the animated connectors that follow them, the title hover and the Reset and Pause buttons. Without JavaScript the cards are static and readable |
| `tools.js` | The Tools section's interaction: draggable badges, panel tilt, headline letters, the AI Stack network canvas and the Reset and Pause buttons. Without JavaScript the panels are static and every tool name is plain text |
| `portfolio.md` | Plain-text version for GitHub or email |
| `projects/*.md` | Seven case studies. Two are based on public repos, the others are honest placeholders |
| `samples/*.md` | Five illustrative QA artefacts |

## Things to know

- **Case-study links open `.md` files** (and so do the Work Samples cards when JavaScript is off). Locally a browser shows them as plain text. On GitHub they render nicely. If you deploy to GitHub Pages and want rendered pages, convert them to HTML or enable a Jekyll theme.
- **Download CV** points at `../cv/Plamen_Tanev_Senior_QA_CV.md`. Export a PDF, put it in this folder (for example `Plamen_Tanev_Senior_QA_CV.pdf`) and update the two `Download CV` links in `index.html`.
- **The phone number is not on the page** on purpose. Email, LinkedIn and GitHub are shown.
- **Hero visual** is CSS-only. To use a generated image, see `../assets/placeholders/portfolio-hero-placeholder.md`.
- **About** (`#about`) is the interactive "AI-Powered QA: Redefining Testing." workflow, from `Documents/Codex/2026-10-06/writ/outputs/ai-qa-interactive-workflow.html` (it replaced the static poster built from `Documents/Codex/2026-10-04/w/outputs/ai-powered-qa`). Nine cards sit on a board with animated connectors that follow them. Drag a card by its handle or focus the handle and use the arrow keys (Shift moves further); "Reset layout" and "Pause flow" are above the board, the flow also pauses off screen and with `prefers-reduced-motion`, and hovering the title's second line lifts its letters. The cards are static markup (percent widths, pixel tops, in `index.html`) so the section reads without JavaScript; the connector list and drag logic are in `about.js`. Below 760px the board scrolls sideways. The closing copy is the reference's wording (AI supports the work and human testers review it), and type is a little smaller than the reference (60px title, 19px text). Names are prefixed `qf-`.
- **Projects** (`#projects`) is the neon gallery from the reference build in `Documents/Codex/2026-10-04/w/outputs/neon-project-gallery`: eight scenes in two columns on desktop and one on phones, each with generated artwork behind a glowing card, and a native details dialog (Escape, backdrop click and the close button all work, and focus returns to the card). Edit the `projects` array at the top of `gallery.js`; a card's artwork comes from its position in that array and its `effect` and `color`, so reordering the list changes the pictures. Names are prefixed `pg-` so the page's own `.card`, `.tag` and `.icon` rules cannot reach it. Scenes are painted only when they are about to be seen, because the section is far down a long page. The case-study links live in each dialog (the old cards linked straight to them), and the old intro note about repositories is now the note at the foot of each dialog: public repositories test demo or third-party sites, and case studies have no public repository yet. The reference's copy is sample copy by its own README, so a few lines follow the case studies instead: the Cypress and API Testing card wording and the Personal Tooling tag keep the earlier site text, the first Playwright card drops "fixtures", and its checklist and three dialog bullets are limited to what `projects/*.md` states. The reference has two Playwright scenes; both are kept.
- **Work Samples** (`#samples`) is five interactive cards, from the reference build in `Documents/Codex/2026-10-06/writ/outputs/qa-interactive-cards.html`: two scenes per row and the Regression Checklist full width, each with an animated network canvas behind a glowing card. Drag a card by its handle (or focus the handle and use the arrow keys); the card stays inside its scene and "Reset card positions" puts them back. "Open" shows the sample in a native dialog with an editor, Copy Markdown and Download .md; edits last until the page is reloaded. The dialog text is the real `samples/*.md` content, copied into `samples.js` because the page is opened from disk, where `fetch()` cannot read files, so **update `samples.js` when a sample file changes**. The reference's own template text was not used. Card wording and file names are the site's; the "not from any employer" note stays above the cards. Names are prefixed `ws-`. Animation pauses off screen and stops with `prefers-reduced-motion`.
- **Tools** (`#tools`) is three neon panels with circuit traces, an energy ring and lightning arcs behind the tool badges, from `Documents/Codex/2026-10-06/writ/outputs/tools-interactive-modern.html`. Hover the headline's accent letters, drag a badge (it stays inside its panel) or focus it and use the arrow keys (Shift moves further), and tilt a panel with the mouse; "Reset badge positions" and "Pause effects" are above the panels. Effects also pause while the section is off screen and stop with `prefers-reduced-motion`. Each of the 28 badges is a keyboard stop, as in the reference. The reference is one 940px column, which is what shows below 1000px; from 1000px up the first two panels sit side by side with AI Stack centred under them and sizes are a little smaller, because an earlier, much larger poster version looked too big next to the rest of the page. Edit tool names in `index.html` (the ring streaks come from `script.js`). Names are prefixed `te-`.
- **Areas of Expertise** (`#expertise`) is five static cards, one neon tone each (`tone-*` class sets `--card-rgb`), with a CSS/SVG mini dashboard per card. The dashboards are decorative shapes with no figures, so no metrics are implied. Each card sits in a static `.expertise-slot`, which takes the hover and tilt so a lifted card cannot flicker under the pointer. Motion respects `prefers-reduced-motion`. Card link targets that had no dedicated page point at the nearest real one: "AI test workflow" and "Prompt examples" both open the AI-assisted QA case study, and "Sample risk analysis" and "QA decision map" both open the sample risk analysis. Repoint them if you add dedicated pages.
- If you deploy only this folder, copy any files from `../cv` or `../assets` that you link to into it, and update the paths.

## Deploy (optional)

1. Create a GitHub repository (for example `plamentanev.github.io` or `qa-portfolio`).
2. Copy the contents of this `portfolio/` folder to the repository root.
3. In the repository settings enable **Pages** from the main branch.
4. Add the live URL to the CV files and LinkedIn.

## TODOs

- [ ] Replace the CV link with a PDF.
- [ ] Add screenshots to the project pages.
- [ ] Add a Cypress practice repository and a public Postman collection, then update those two case studies and their cards.
- [ ] Add your portfolio URL to the CV and LinkedIn once deployed.
