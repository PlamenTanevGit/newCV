# Sample Regression Checklist

> **Illustrative sample.** Generic web application example. The structure is what matters: smoke first, then critical flows, then deeper checks. Adapt the rows to the real product and release scope.

**Release scope:** TODO (version, changed areas, risk notes from the change list)
**Environment / build:** TODO
**Browsers in scope:** Chrome (latest), Firefox (latest), Edge (latest), Safari (latest, if supported)

## 1. Smoke (run first, stop and escalate if any item fails)

| Area | Check | Result |
|---|---|---|
| Smoke | Application loads and the login page is reachable | ☐ |
| Smoke | Valid user can log in and reach the home page | ☐ |
| Smoke | Main navigation items open without errors | ☐ |
| Smoke | Health or status endpoint returns success (if available) | ☐ |

## 2. Critical flows

| Critical flow | Key checks | Result |
|---|---|---|
| Login / logout / session | Valid login, invalid login message, logout, session expiry | ☐ |
| Create a record (e.g. work request) | Mandatory fields, successful save, record visible in list and detail | ☐ |
| Edit and status change | Edit saved, allowed status transitions only, history updated | ☐ |
| Search and filter | Results match filters, empty-state message, sorting and paging | ☐ |
| Roles and permissions | Each role sees only permitted menus and actions | ☐ |
| Notifications / email | Triggered on the expected events, correct recipients and content | ☐ |

## 3. Data validation

| Check | Result |
|---|---|
| Saved values equal entered values (UI, API response, database where accessible) | ☐ |
| No duplicate records after a save or retry | ☐ |
| Boundary values (min, max, max + 1) on key fields | ☐ |
| Date, time zone and number formatting | ☐ |

## 4. UI validation

| Check | Result |
|---|---|
| Labels, validation messages and error texts are correct and readable | ☐ |
| Layout intact at common resolutions (desktop and a narrow window) | ☐ |
| Keyboard navigation and visible focus on forms (accessibility basics) | ☐ |
| No console errors on the main flows | ☐ |

## 5. API validation

| Check | Result |
|---|---|
| Key endpoints return the expected status codes (200/201/400/401/403/404) | ☐ |
| Response schema and mandatory fields unchanged | ☐ |
| Auth is enforced (no token, expired token, wrong role) | ☐ |

## 6. Cross-browser check

| Browser | Smoke | Critical flows | Notes |
|---|---|---|---|
| Chrome | ☐ | ☐ | |
| Firefox | ☐ | ☐ | |
| Edge | ☐ | ☐ | |
| Safari | ☐ | ☐ | |

## 7. Negative scenarios

| Scenario | Result |
|---|---|
| Submit with empty mandatory fields | ☐ |
| Invalid input (special characters, very long text, script-like input) | ☐ |
| Double-click / double-submit | ☐ |
| Unauthorised direct URL access | ☐ |
| Network interruption during save | ☐ |

## 8. Risk notes

- Areas touched by this release get extra exploratory time.
- Known open defects that affect regression scope: TODO.
- Items skipped and why (time, data, environment): TODO.
- Candidates to move into automation after this run: TODO.

## Sign-off

| Field | Value |
|---|---|
| Executed by | TODO |
| Date | TODO |
| Result | Go / Go with known issues / No-go |
| Open defects | TODO |
