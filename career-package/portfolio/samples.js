// Work Samples: interactive QA artefact cards (ported from Documents/Codex/2026-10-06/writ/outputs/qa-interactive-cards.html).
// Progressive enhancement: without JavaScript each card is a plain link to its samples/*.md file. With it, every scene
// gets an animated network canvas, a drag handle (pointer, or arrow keys when focused), a gentle tilt under the mouse,
// and "Open" shows the sample in a native dialog where it can be edited, copied or downloaded as Markdown.
// SAMPLES is a copy of the text in samples/*.md (same files, same words): the page is opened straight from disk, where
// fetch() cannot read them. If a sample file changes, update its entry here too.
(function () {
  "use strict";

  var SAMPLES = {
    "sample-test-case.md": "# Sample Test Case\n\n> **Illustrative sample.** This is a fictional example written to show how I structure test cases. It is not taken from any employer's product or system.\n\n**Feature under test:** Submitting a work request in a generic facility-management style web application.\n\n| Field | Value |\n|---|---|\n| **Test Case ID** | TC-WR-014 |\n| **Title** | Submit a work request with all mandatory fields and a valid attachment |\n| **Preconditions** | 1. User account with the *Requester* role exists and is active.<br>2. User is logged in and on the \"New Work Request\" page.<br>3. At least one active location and one active category exist in the reference data.<br>4. A test file `leak_photo.jpg` (800 KB) is available locally. |\n| **Priority** | High |\n| **Type** | Functional, positive, end-to-end (UI + persisted data) |\n| **Linked requirement** | TODO: link to the user story / acceptance criteria (e.g. Jira key) when used in a real project |\n\n## Steps\n\n| # | Action | Test data |\n|---|---|---|\n| 1 | Select a location from the *Location* dropdown. | Location: \"Building A / Floor 2\" |\n| 2 | Select a category from the *Category* dropdown. | Category: \"Plumbing\" |\n| 3 | Enter a short description. | \"Water leak under sink in room 2.14\" |\n| 4 | Select a priority. | Priority: \"High\" |\n| 5 | Attach a file using the *Attach* control. | `leak_photo.jpg` |\n| 6 | Click **Submit**. | n/a |\n| 7 | Open the request from the \"My Requests\" list. | n/a |\n\n## Expected Result\n\n1. After step 5 the attachment name and size are shown and no validation error appears.\n2. After step 6 a success message is displayed and the user is redirected to the request detail page.\n3. The request receives a unique, system-generated number and the initial status \"New\".\n4. In step 7 all entered values (location, category, description, priority) and the attachment are shown exactly as submitted.\n5. A request-created entry appears in the request's activity history, with the correct user and timestamp.\n\n## Actual Result\n\n_Not executed. Fill in during execution._\n\n## Status\n\nNot Run (options: Not Run / Pass / Fail / Blocked)\n\n## Notes\n\n- **Negative / boundary variants to derive from this case:** empty mandatory fields, description at max length and max length + 1, unsupported file type, file above the size limit, double-click on **Submit** (duplicate request check), session timeout during submit.\n- **Data check:** where database access is available, confirm one request record and one attachment record were created (no duplicates).\n- **Cross-browser:** run on the supported browser matrix as part of regression.\n- **Automation candidate:** Yes. Stable end-to-end flow, high business value, good fit for the regression suite.\n",
    "sample-bug-report.md": "# Sample Bug Report\n\n> **Illustrative sample.** This is a fictional defect written to show how I report bugs. It does not describe a real defect in any employer's product.\n\n| Field | Value |\n|---|---|\n| **Bug ID** | BUG-0000 (sample) |\n| **Title** | Work request is created twice when **Submit** is double-clicked on a slow connection |\n| **Environment** | Test environment (TODO: name). Build 1.0.0-sample. Windows 11, Chrome (latest). Network throttled to \"Slow 3G\" via browser dev tools. |\n| **Severity** | Major. Data integrity issue, no data loss, workaround exists. |\n| **Priority** | High. Duplicate records create duplicate tasks for the support team. |\n| **Reproducibility** | 5 out of 5 attempts with throttling enabled. Not reproduced with normal network speed in 5 attempts. |\n\n## Preconditions\n\n1. User with the *Requester* role is logged in.\n2. Browser dev tools are open with network throttling set to \"Slow 3G\".\n3. The \"New Work Request\" form is filled in with valid data.\n\n## Steps to Reproduce\n\n1. Click **Submit** once.\n2. Click **Submit** a second time within about one second, before the page responds.\n3. Wait for the redirect and open \"My Requests\".\n\n## Actual Result\n\nTwo requests with identical data and different request numbers (for example WR-1001 and WR-1002) are listed. Each one has a \"request created\" entry in its history.\n\n## Expected Result\n\nExactly one request is created. The **Submit** button is disabled (or the request is made idempotent) after the first click, and the user sees a single confirmation.\n\n## Attachments\n\n- `double-submit.mp4`: screen recording (TODO: attach in a real report)\n- `network-log.har`: HAR export showing two `POST` calls (TODO: attach in a real report)\n\n## Logs\n\n```text\nPOST /api/v1/work-requests  -> 201 Created  (first click)\nPOST /api/v1/work-requests  -> 201 Created  (second click)\n```\n\n_The log above is illustrative of what I would capture, not real output._\n\n## Notes\n\n- Related risks worth checking: browser back button after submit, pressing Enter twice in the form, page refresh immediately after submit.\n- No console errors were observed in this scenario.\n\n## Suggested Investigation Area\n\n- Front end: disabling the submit control on first click, and handling in-flight state.\n- Back end: idempotency key or duplicate-detection window on the create endpoint.\n- Add a regression test at API level (two identical concurrent `POST` calls) and at UI level (double-click).\n",
    "sample-regression-checklist.md": "# Sample Regression Checklist\n\n> **Illustrative sample.** Generic web application example. The structure is what matters: smoke first, then critical flows, then deeper checks. Adapt the rows to the real product and release scope.\n\n**Release scope:** TODO (version, changed areas, risk notes from the change list)\n**Environment / build:** TODO\n**Browsers in scope:** Chrome (latest), Firefox (latest), Edge (latest), Safari (latest, if supported)\n\n## 1. Smoke (run first, stop and escalate if any item fails)\n\n| Area | Check | Result |\n|---|---|---|\n| Smoke | Application loads and the login page is reachable | ☐ |\n| Smoke | Valid user can log in and reach the home page | ☐ |\n| Smoke | Main navigation items open without errors | ☐ |\n| Smoke | Health or status endpoint returns success (if available) | ☐ |\n\n## 2. Critical flows\n\n| Critical flow | Key checks | Result |\n|---|---|---|\n| Login / logout / session | Valid login, invalid login message, logout, session expiry | ☐ |\n| Create a record (e.g. work request) | Mandatory fields, successful save, record visible in list and detail | ☐ |\n| Edit and status change | Edit saved, allowed status transitions only, history updated | ☐ |\n| Search and filter | Results match filters, empty-state message, sorting and paging | ☐ |\n| Roles and permissions | Each role sees only permitted menus and actions | ☐ |\n| Notifications / email | Triggered on the expected events, correct recipients and content | ☐ |\n\n## 3. Data validation\n\n| Check | Result |\n|---|---|\n| Saved values equal entered values (UI, API response, database where accessible) | ☐ |\n| No duplicate records after a save or retry | ☐ |\n| Boundary values (min, max, max + 1) on key fields | ☐ |\n| Date, time zone and number formatting | ☐ |\n\n## 4. UI validation\n\n| Check | Result |\n|---|---|\n| Labels, validation messages and error texts are correct and readable | ☐ |\n| Layout intact at common resolutions (desktop and a narrow window) | ☐ |\n| Keyboard navigation and visible focus on forms (accessibility basics) | ☐ |\n| No console errors on the main flows | ☐ |\n\n## 5. API validation\n\n| Check | Result |\n|---|---|\n| Key endpoints return the expected status codes (200/201/400/401/403/404) | ☐ |\n| Response schema and mandatory fields unchanged | ☐ |\n| Auth is enforced (no token, expired token, wrong role) | ☐ |\n\n## 6. Cross-browser check\n\n| Browser | Smoke | Critical flows | Notes |\n|---|---|---|---|\n| Chrome | ☐ | ☐ | |\n| Firefox | ☐ | ☐ | |\n| Edge | ☐ | ☐ | |\n| Safari | ☐ | ☐ | |\n\n## 7. Negative scenarios\n\n| Scenario | Result |\n|---|---|\n| Submit with empty mandatory fields | ☐ |\n| Invalid input (special characters, very long text, script-like input) | ☐ |\n| Double-click / double-submit | ☐ |\n| Unauthorised direct URL access | ☐ |\n| Network interruption during save | ☐ |\n\n## 8. Risk notes\n\n- Areas touched by this release get extra exploratory time.\n- Known open defects that affect regression scope: TODO.\n- Items skipped and why (time, data, environment): TODO.\n- Candidates to move into automation after this run: TODO.\n\n## Sign-off\n\n| Field | Value |\n|---|---|\n| Executed by | TODO |\n| Date | TODO |\n| Result | Go / Go with known issues / No-go |\n| Open defects | TODO |\n",
    "sample-api-test-plan.md": "# Sample API Test Plan\n\n> **Illustrative sample.** The endpoint below is fictional (`/api/v1/work-requests`) and exists only to demonstrate how I plan REST API testing. Adapt it to a real contract (Swagger/OpenAPI or the team's API documentation).\n\n## Scope\n\n| Item | Detail |\n|---|---|\n| **Endpoint** | `/api/v1/work-requests` and `/api/v1/work-requests/{id}` |\n| **Methods** | `POST` (create), `GET` (read, list), `PUT` (update), `DELETE` (cancel) |\n| **Auth** | Bearer token (OAuth2 / JWT). Roles: Requester, Technician, Admin |\n| **Tools** | Postman (collection + environments + test scripts), optional REST Assured for CI |\n| **Environment** | TODO: test base URL; credentials come from environment variables, never committed |\n\n## Request data (`POST` example)\n\n```json\n{\n  \"locationId\": 12,\n  \"categoryId\": 3,\n  \"description\": \"Water leak under sink in room 2.14\",\n  \"priority\": \"HIGH\"\n}\n```\n\n## Positive cases\n\n| ID | Case | Expected |\n|---|---|---|\n| P1 | Create with all valid fields (Requester token) | 201, body has `id`, `status = NEW`, echoed values |\n| P2 | Get the created request by `id` | 200, same data as created |\n| P3 | List with pagination (`page`, `size`) and filter by `status` | 200, correct page size, only matching items |\n| P4 | Update description (owner) | 200, updated value persisted, `updatedAt` changed |\n| P5 | Cancel a request in an allowed status | 200/204, status becomes `CANCELLED` |\n\n## Negative cases\n\n| ID | Case | Expected |\n|---|---|---|\n| N1 | Missing mandatory field (`description`) | 400 with field-level error message |\n| N2 | Wrong data type (`locationId` as text) | 400 |\n| N3 | Invalid enum value (`priority = \"URGENT!\"`) | 400 |\n| N4 | Description over max length / max + 1 | max accepted, max + 1 rejected (400) |\n| N5 | No token / expired token / malformed token | 401 |\n| N6 | Valid token, insufficient role (e.g. Requester deletes another user's request) | 403 |\n| N7 | Unknown `id` | 404 |\n| N8 | Update after the request is closed | 409 (or the documented rule) |\n| N9 | Same `POST` sent twice quickly | Documented behaviour: one record (idempotency) or a clear duplicate rule |\n\n## Status codes to verify\n\n`200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `415` (wrong content type), `429` (if rate limiting exists), `5xx` must never appear for bad input.\n\n## Schema validation\n\n- Validate every response against the JSON schema derived from the contract: required fields, types, enums, nullable fields.\n- Check that no unexpected fields appear (for example internal IDs, other users' data).\n- Postman: `tv4`/`ajv`-style schema assertion in the test script. REST Assured: JSON-schema validator matcher.\n\n## Data validation\n\n- Values returned equal values sent (including trimming, encoding and special characters).\n- Created data is visible through the UI and, where access is allowed, in the database (one row, correct foreign keys).\n- Timestamps use the documented format and time zone.\n- Pagination: `total`, `page`, `size` are consistent with the actual items.\n\n## Performance smoke check\n\nNot load testing. A basic sanity check only:\n- Record response time of the main calls in the Postman runner.\n- Flag anything above the agreed threshold (TODO: team-agreed value, for example 1 s for `GET`, 2 s for `POST`).\n- Escalate suspected issues to the performance-testing owner.\n\n## Security notes\n\n- Authorisation matrix: every role against every method (including access to other users' records, an IDOR check).\n- Token handling: expired, tampered and missing tokens.\n- Input handling: very long strings, special characters, script-like and SQL-like input must be rejected or safely handled.\n- Error responses must not leak stack traces or internal details.\n- Sensitive values stay out of URLs and logs.\n- A deeper security assessment belongs to a security specialist.\n\n## Execution and reporting\n\n- Postman collection runs on demand and, where the team has CI, in the pipeline (Newman, Jenkins or GitHub Actions).\n- Failures are reported as defects with the request, response, environment and a timestamp.\n- Keep the collection in version control next to the test documentation.\n",
    "sample-qa-risk-analysis.md": "# Sample QA Risk Analysis\n\n> **Illustrative sample.** A fictional release of a generic web application, used to show how I turn a change list into a risk-based test focus. Ratings are examples, not measurements from a real system.\n\n**Release:** TODO (name / version)\n**Change summary (example):** new bulk-import feature, updated role permissions, upgraded date-picker component.\n\n## How I rate\n\n- **Likelihood:** how probable is a defect (new code, complexity, history of defects, integration points).\n- **Impact:** user impact and business impact if it fails in production.\n- **Testing priority:** High / Medium / Low, from likelihood and impact together.\n\n## Risk table\n\n| Feature area | Risk | User impact | Business impact | Testing priority | Recommended coverage | Open questions |\n|---|---|---|---|---|---|---|\n| Bulk import (new) | Wrong or partial data imported; silent row failures | Users see wrong or missing records | Data integrity issues, support load | **High** | Boundary file sizes, malformed rows, duplicates, rollback behaviour, row-level error report, DB verification. Manual exploratory first, then automate the happy path | What is the max rows/file size? Is import all-or-nothing? |\n| Role permissions (changed) | A role gains or loses access by mistake | Users see data or actions they should not, or are blocked | Security and compliance exposure | **High** | Role × action matrix on UI and API, direct URL access, token with wrong role | Are there roles not covered by the matrix? |\n| Date-picker upgrade | Wrong date selected, formatting or time-zone shift | Wrong dates saved | Incorrect scheduling and reporting | **Medium** | Locale and time-zone checks, month boundaries, keyboard input, all browsers in scope | Which locales are officially supported? |\n| Core create/edit flow (unchanged) | Indirect regression via shared components | Users cannot save records | High, but low likelihood | **Medium** | Automated regression plus a short manual smoke | None |\n| Notifications / email | Duplicate or missing messages | Users miss updates | Reduced trust, delays | **Medium** | Trigger each event once, check recipients and content | Is the mail service stubbed in test? |\n| Reports / exports | Totals differ from source data | Wrong numbers in decisions | Reputation and decision risk | **Medium** | Compare export against UI and DB for a known data set | Which reports changed? |\n| Admin settings (unchanged) | Low | Low | Low | **Low** | Smoke only | None |\n\n## Test approach summary\n\n1. **Day 0:** review stories and acceptance criteria with the product owner and developers. Raise the open questions above.\n2. **Early:** test new and high-risk areas first, with exploratory sessions and API-level checks.\n3. **Mid:** run the automated regression and the manual smoke for unchanged critical flows.\n4. **Late:** retest fixes, confirm data checks, run the cross-browser pass, report status.\n5. **Sign-off:** report residual risk plainly (what was not tested and why) so the release decision is informed.\n\n## Residual risk statement (template)\n\n> Tested: TODO. Not tested / limited: TODO. Known open defects: TODO. Recommendation: Go / Go with known issues / No-go.\n"
  };

  var section = document.getElementById("samples");
  var dialog = document.getElementById("ws-viewer");
  if (!section || !dialog || typeof dialog.showModal !== "function" || !window.ResizeObserver) return;

  var editor = document.getElementById("ws-editor");
  var statusEl = document.getElementById("ws-status");
  var titleEl = document.getElementById("ws-dialog-title");
  var resetBtn = document.getElementById("ws-reset");
  var tools = section.querySelector(".ws-tools");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var drafts = {}; // edits made in the dialog are kept until the page is reloaded
  var states = [];
  var active = null;
  var lastFocus = null;

  if (tools) tools.hidden = false;

  Array.prototype.forEach.call(section.querySelectorAll(".ws-scene"), function (scene) {
    var key = scene.getAttribute("data-sample");
    var card = scene.querySelector(".ws-card");
    var openLink = scene.querySelector(".ws-open");
    if (!card || !openLink || typeof SAMPLES[key] !== "string") return;

    var cardTitle = card.querySelector("h3").textContent;
    var color = scene.style.getPropertyValue("--accent").trim() || "#c8ff00";
    var s = { scene: scene, card: card, key: key, file: card.querySelector(".ws-filename").textContent.trim(),
              title: cardTitle, color: color, x: 0, y: 0, w: 0, h: 0, visible: false, ctx: null, canvas: null };
    states.push(s);

    // Network canvas behind the card
    s.canvas = document.createElement("canvas");
    s.canvas.setAttribute("aria-hidden", "true");
    scene.insertBefore(s.canvas, scene.firstChild);
    s.ctx = s.canvas.getContext("2d");
    s.nodes = [];
    for (var n = 0; n < 26; n++) s.nodes.push({ x: (n * 0.618) % 1, y: (n * 0.381 + 0.13) % 1, phase: n });

    // Drag handle
    var grip = document.createElement("button");
    grip.className = "ws-grip";
    grip.type = "button";
    grip.textContent = "⠿";
    grip.title = "Drag or use arrow keys";
    grip.setAttribute("aria-label", "Move the " + cardTitle + " card with the arrow keys");
    card.insertBefore(grip, card.firstChild);

    s.position = function () {
      var limitX = Math.max(0, (scene.clientWidth - card.offsetWidth) / 2 - 8);
      var limitY = Math.max(0, (scene.clientHeight - card.offsetHeight) / 2 - 8);
      s.x = Math.max(-limitX, Math.min(limitX, s.x));
      s.y = Math.max(-limitY, Math.min(limitY, s.y));
      card.style.setProperty("--dx", s.x + "px");
      card.style.setProperty("--dy", s.y + "px");
    };
    s.resetTilt = function () {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };

    var drag = null;
    grip.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, ox: s.x, oy: s.y };
      grip.setPointerCapture(e.pointerId);
    });
    grip.addEventListener("pointermove", function (e) {
      if (!drag) return;
      s.x = drag.ox + e.clientX - drag.x;
      s.y = drag.oy + e.clientY - drag.y;
      s.position();
    });
    var endDrag = function () { drag = null; };
    grip.addEventListener("pointerup", endDrag);
    grip.addEventListener("pointercancel", endDrag);
    grip.addEventListener("lostpointercapture", endDrag);
    grip.addEventListener("keydown", function (e) {
      var moves = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
      if (!moves[e.key]) return;
      e.preventDefault();
      s.x += moves[e.key][0];
      s.y += moves[e.key][1];
      s.position();
    });

    // Tilt toward the pointer (mouse only, not while dragging, not with reduced motion)
    card.addEventListener("pointermove", function (e) {
      if (drag || reduced.matches || e.pointerType !== "mouse") return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--rx", (-(e.clientY - r.top - r.height / 2) / r.height * 7) + "deg");
      card.style.setProperty("--ry", ((e.clientX - r.left - r.width / 2) / r.width * 7) + "deg");
    });
    card.addEventListener("pointerleave", s.resetTilt);

    // Open the sample in the dialog (the link still works as a plain link without this script)
    openLink.setAttribute("aria-haspopup", "dialog");
    openLink.addEventListener("click", function (e) {
      e.preventDefault();
      active = s;
      lastFocus = openLink;
      titleEl.textContent = s.title;
      editor.value = typeof drafts[key] === "string" ? drafts[key] : SAMPLES[key];
      statusEl.textContent = "";
      dialog.showModal();
    });

    new ResizeObserver(function () {
      s.position();
      s.w = scene.clientWidth;
      s.h = scene.clientHeight;
      var d = Math.min(window.devicePixelRatio || 1, 2);
      s.canvas.width = s.w * d;
      s.canvas.height = s.h * d;
      s.ctx.setTransform(d, 0, 0, d, 0, 0);
      draw(s, 0);
    }).observe(scene);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        s.visible = entries[0].isIntersecting;
        scene.classList.toggle("is-live", s.visible);
      }).observe(scene);
    } else {
      s.visible = true;
      scene.classList.add("is-live");
    }
  });

  function draw(s, time) {
    var ctx = s.ctx, w = s.w, h = s.h;
    ctx.clearRect(0, 0, w, h);
    var points = s.nodes.map(function (n) {
      return { x: n.x * w + Math.sin(time * 0.0003 + n.phase) * 12, y: n.y * h + Math.cos(time * 0.0004 + n.phase) * 12 };
    });
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    for (var a = 0; a < points.length; a++) {
      for (var b = a + 1; b < points.length; b++) {
        var p = points[a], q = points[b];
        if (Math.hypot(p.x - q.x, p.y - q.y) < 120) {
          ctx.globalAlpha = 0.16;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.65;
      ctx.beginPath(); ctx.arc(points[a].x, points[a].y, 2.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // One animation loop for all scenes; only scenes on screen are redrawn
  function tick(t) {
    if (!document.hidden && !reduced.matches) {
      states.forEach(function (s) { if (s.visible) draw(s, t); });
    }
    window.requestAnimationFrame(tick);
  }
  window.requestAnimationFrame(tick);

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      states.forEach(function (s) { s.x = 0; s.y = 0; s.position(); s.resetTilt(); });
    });
  }

  document.getElementById("ws-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("close", function () {
    if (active) drafts[active.key] = editor.value;
    if (lastFocus) lastFocus.focus();
  });

  document.getElementById("ws-download").addEventListener("click", function () {
    if (!active) return;
    var url = URL.createObjectURL(new Blob([editor.value], { type: "text/markdown;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = active.file;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    statusEl.textContent = "Markdown download started.";
  });

  document.getElementById("ws-copy").addEventListener("click", function () {
    var fallback = function () {
      editor.focus();
      editor.select();
      statusEl.textContent = "Press Ctrl+C (or Command+C) to copy the selected text.";
    };
    if (!navigator.clipboard || !navigator.clipboard.writeText) { fallback(); return; }
    navigator.clipboard.writeText(editor.value).then(function () { statusEl.textContent = "Copied."; }, fallback);
  });
})();
