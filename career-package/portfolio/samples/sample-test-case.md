# Sample Test Case

> **Illustrative sample.** This is a fictional example written to show how I structure test cases. It is not taken from any employer's product or system.

**Feature under test:** Submitting a work request in a generic facility-management style web application.

| Field | Value |
|---|---|
| **Test Case ID** | TC-WR-014 |
| **Title** | Submit a work request with all mandatory fields and a valid attachment |
| **Preconditions** | 1. User account with the *Requester* role exists and is active.<br>2. User is logged in and on the "New Work Request" page.<br>3. At least one active location and one active category exist in the reference data.<br>4. A test file `leak_photo.jpg` (800 KB) is available locally. |
| **Priority** | High |
| **Type** | Functional, positive, end-to-end (UI + persisted data) |
| **Linked requirement** | TODO: link to the user story / acceptance criteria (e.g. Jira key) when used in a real project |

## Steps

| # | Action | Test data |
|---|---|---|
| 1 | Select a location from the *Location* dropdown. | Location: "Building A / Floor 2" |
| 2 | Select a category from the *Category* dropdown. | Category: "Plumbing" |
| 3 | Enter a short description. | "Water leak under sink in room 2.14" |
| 4 | Select a priority. | Priority: "High" |
| 5 | Attach a file using the *Attach* control. | `leak_photo.jpg` |
| 6 | Click **Submit**. | n/a |
| 7 | Open the request from the "My Requests" list. | n/a |

## Expected Result

1. After step 5 the attachment name and size are shown and no validation error appears.
2. After step 6 a success message is displayed and the user is redirected to the request detail page.
3. The request receives a unique, system-generated number and the initial status "New".
4. In step 7 all entered values (location, category, description, priority) and the attachment are shown exactly as submitted.
5. A request-created entry appears in the request's activity history, with the correct user and timestamp.

## Actual Result

_Not executed. Fill in during execution._

## Status

Not Run (options: Not Run / Pass / Fail / Blocked)

## Notes

- **Negative / boundary variants to derive from this case:** empty mandatory fields, description at max length and max length + 1, unsupported file type, file above the size limit, double-click on **Submit** (duplicate request check), session timeout during submit.
- **Data check:** where database access is available, confirm one request record and one attachment record were created (no duplicates).
- **Cross-browser:** run on the supported browser matrix as part of regression.
- **Automation candidate:** Yes. Stable end-to-end flow, high business value, good fit for the regression suite.
