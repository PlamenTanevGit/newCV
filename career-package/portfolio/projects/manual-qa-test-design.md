# Manual QA and Test Design

**Evidence level: training-era artefacts and CV statements. Work samples here are illustrative.** Employer test cases and bug reports are confidential and are not shown.

## Project Overview

Manual testing is the core of my QA practice: reading requirements, designing test cases, exploring the product and reporting defects clearly. Evidence available publicly:

- **Illustrative work samples** written for this portfolio: [test case](../samples/sample-test-case.md), [bug report](../samples/sample-bug-report.md), [regression checklist](../samples/sample-regression-checklist.md), [risk analysis](../samples/sample-qa-risk-analysis.md).
- **Training-era Jira bug exports (2017)** in my Google Drive for a practice project, "Online Parking Calculator" (for example items titled "Economy parking more than 7d,0h,15min BUG" and "Valet Parking 24h (1day) wrong USD calculation"). These come from a testing course exercise, not from an employer.
- CV statements about professional work (test cases and defects authored at Nuvolo). These numbers are unverified and are on the CV, not on this page.
- Certificates: *Software Testing* (Soft Academy, 2017); ISTQB Foundation (TODO: confirm).

## Problem / Context

Specifications are rarely complete. Good manual testing finds the gaps between what was written, what was built and what a user actually needs, and records the findings so the team can act on them.

## Tools Used

Jira (test cases and defects), Confluence, TestRail, Zephyr, Excel/Sheets where no tool exists, browser developer tools, Postman for quick API checks, SQL for data checks.

## QA Approach

- **Requirement review first:** questions go to the product owner before any test is written.
- **Techniques:** equivalence partitioning, boundary value analysis, decision tables, state transitions, error guessing, exploratory sessions with charters.
- **Risk-based priority:** recent changes, high business impact and defect history get the most time.
- **Traceability:** each test links to a story or acceptance criterion.
- **Defect reports:** short title, environment, exact steps, actual vs expected, evidence, severity and priority, suggested area to investigate.

## What Was Tested

Illustrative samples cover a work-request form (mandatory fields, attachments, duplicates), role permissions and a bulk-import feature.

## Example Scenarios

1. Boundary values on a text field (max, max + 1, empty, special characters).
2. Double-click on **Submit** on a slow connection (duplicate record risk).
3. Role × action matrix for permissions.
4. Exploratory session: "Explore attachments with unusual file names and sizes to discover validation gaps."

## Example Test Cases

See [`samples/sample-test-case.md`](../samples/sample-test-case.md), which contains a full test case (TC-WR-014) with preconditions, steps, expected results and derived negative variants.

## Business Value

No measured results are claimed here. The goal of this page is to show the way of thinking: structured design, risk focus and reports that shorten the time from defect to fix.

## What I Would Improve Next

- Add a short, public exploratory-testing charter example and session notes.
- Build a test-design cheat sheet (boundaries, partitions, state transitions) with worked examples.
- Add accessibility-basics checks (keyboard, focus, labels, contrast) to the regression checklist.

## Repository / Demo Link

TODO: publish the `samples/` folder as a small public repository, or link to the deployed portfolio.

## Screenshots

TODO: Add a rendered view of the sample test case and bug report. See `assets/placeholders/project-screenshot-placeholders.md`.

## TODOs

- [ ] Confirm whether the 2017 Online Parking Calculator exports may be shown publicly.
- [ ] Add one non-confidential, real-world example of a high-value defect you found, if you can describe it generically.
