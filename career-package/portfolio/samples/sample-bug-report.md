# Sample Bug Report

> **Illustrative sample.** This is a fictional defect written to show how I report bugs. It does not describe a real defect in any employer's product.

| Field | Value |
|---|---|
| **Bug ID** | BUG-0000 (sample) |
| **Title** | Work request is created twice when **Submit** is double-clicked on a slow connection |
| **Environment** | Test environment (TODO: name). Build 1.0.0-sample. Windows 11, Chrome (latest). Network throttled to "Slow 3G" via browser dev tools. |
| **Severity** | Major. Data integrity issue, no data loss, workaround exists. |
| **Priority** | High. Duplicate records create duplicate tasks for the support team. |
| **Reproducibility** | 5 out of 5 attempts with throttling enabled. Not reproduced with normal network speed in 5 attempts. |

## Preconditions

1. User with the *Requester* role is logged in.
2. Browser dev tools are open with network throttling set to "Slow 3G".
3. The "New Work Request" form is filled in with valid data.

## Steps to Reproduce

1. Click **Submit** once.
2. Click **Submit** a second time within about one second, before the page responds.
3. Wait for the redirect and open "My Requests".

## Actual Result

Two requests with identical data and different request numbers (for example WR-1001 and WR-1002) are listed. Each one has a "request created" entry in its history.

## Expected Result

Exactly one request is created. The **Submit** button is disabled (or the request is made idempotent) after the first click, and the user sees a single confirmation.

## Attachments

- `double-submit.mp4`: screen recording (TODO: attach in a real report)
- `network-log.har`: HAR export showing two `POST` calls (TODO: attach in a real report)

## Logs

```text
POST /api/v1/work-requests  -> 201 Created  (first click)
POST /api/v1/work-requests  -> 201 Created  (second click)
```

_The log above is illustrative of what I would capture, not real output._

## Notes

- Related risks worth checking: browser back button after submit, pressing Enter twice in the form, page refresh immediately after submit.
- No console errors were observed in this scenario.

## Suggested Investigation Area

- Front end: disabling the submit control on first click, and handling in-flight state.
- Back end: idempotency key or duplicate-detection window on the create endpoint.
- Add a regression test at API level (two identical concurrent `POST` calls) and at UI level (double-click).
