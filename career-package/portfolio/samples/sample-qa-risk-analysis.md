# Sample QA Risk Analysis

> **Illustrative sample.** A fictional release of a generic web application, used to show how I turn a change list into a risk-based test focus. Ratings are examples, not measurements from a real system.

**Release:** TODO (name / version)
**Change summary (example):** new bulk-import feature, updated role permissions, upgraded date-picker component.

## How I rate

- **Likelihood:** how probable is a defect (new code, complexity, history of defects, integration points).
- **Impact:** user impact and business impact if it fails in production.
- **Testing priority:** High / Medium / Low, from likelihood and impact together.

## Risk table

| Feature area | Risk | User impact | Business impact | Testing priority | Recommended coverage | Open questions |
|---|---|---|---|---|---|---|
| Bulk import (new) | Wrong or partial data imported; silent row failures | Users see wrong or missing records | Data integrity issues, support load | **High** | Boundary file sizes, malformed rows, duplicates, rollback behaviour, row-level error report, DB verification. Manual exploratory first, then automate the happy path | What is the max rows/file size? Is import all-or-nothing? |
| Role permissions (changed) | A role gains or loses access by mistake | Users see data or actions they should not, or are blocked | Security and compliance exposure | **High** | Role × action matrix on UI and API, direct URL access, token with wrong role | Are there roles not covered by the matrix? |
| Date-picker upgrade | Wrong date selected, formatting or time-zone shift | Wrong dates saved | Incorrect scheduling and reporting | **Medium** | Locale and time-zone checks, month boundaries, keyboard input, all browsers in scope | Which locales are officially supported? |
| Core create/edit flow (unchanged) | Indirect regression via shared components | Users cannot save records | High, but low likelihood | **Medium** | Automated regression plus a short manual smoke | None |
| Notifications / email | Duplicate or missing messages | Users miss updates | Reduced trust, delays | **Medium** | Trigger each event once, check recipients and content | Is the mail service stubbed in test? |
| Reports / exports | Totals differ from source data | Wrong numbers in decisions | Reputation and decision risk | **Medium** | Compare export against UI and DB for a known data set | Which reports changed? |
| Admin settings (unchanged) | Low | Low | Low | **Low** | Smoke only | None |

## Test approach summary

1. **Day 0:** review stories and acceptance criteria with the product owner and developers. Raise the open questions above.
2. **Early:** test new and high-risk areas first, with exploratory sessions and API-level checks.
3. **Mid:** run the automated regression and the manual smoke for unchanged critical flows.
4. **Late:** retest fixes, confirm data checks, run the cross-browser pass, report status.
5. **Sign-off:** report residual risk plainly (what was not tested and why) so the release decision is informed.

## Residual risk statement (template)

> Tested: TODO. Not tested / limited: TODO. Known open defects: TODO. Recommendation: Go / Go with known issues / No-go.
