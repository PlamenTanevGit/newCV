# Sample API Test Plan

> **Illustrative sample.** The endpoint below is fictional (`/api/v1/work-requests`) and exists only to demonstrate how I plan REST API testing. Adapt it to a real contract (Swagger/OpenAPI or the team's API documentation).

## Scope

| Item | Detail |
|---|---|
| **Endpoint** | `/api/v1/work-requests` and `/api/v1/work-requests/{id}` |
| **Methods** | `POST` (create), `GET` (read, list), `PUT` (update), `DELETE` (cancel) |
| **Auth** | Bearer token (OAuth2 / JWT). Roles: Requester, Technician, Admin |
| **Tools** | Postman (collection + environments + test scripts), optional REST Assured for CI |
| **Environment** | TODO: test base URL; credentials come from environment variables, never committed |

## Request data (`POST` example)

```json
{
  "locationId": 12,
  "categoryId": 3,
  "description": "Water leak under sink in room 2.14",
  "priority": "HIGH"
}
```

## Positive cases

| ID | Case | Expected |
|---|---|---|
| P1 | Create with all valid fields (Requester token) | 201, body has `id`, `status = NEW`, echoed values |
| P2 | Get the created request by `id` | 200, same data as created |
| P3 | List with pagination (`page`, `size`) and filter by `status` | 200, correct page size, only matching items |
| P4 | Update description (owner) | 200, updated value persisted, `updatedAt` changed |
| P5 | Cancel a request in an allowed status | 200/204, status becomes `CANCELLED` |

## Negative cases

| ID | Case | Expected |
|---|---|---|
| N1 | Missing mandatory field (`description`) | 400 with field-level error message |
| N2 | Wrong data type (`locationId` as text) | 400 |
| N3 | Invalid enum value (`priority = "URGENT!"`) | 400 |
| N4 | Description over max length / max + 1 | max accepted, max + 1 rejected (400) |
| N5 | No token / expired token / malformed token | 401 |
| N6 | Valid token, insufficient role (e.g. Requester deletes another user's request) | 403 |
| N7 | Unknown `id` | 404 |
| N8 | Update after the request is closed | 409 (or the documented rule) |
| N9 | Same `POST` sent twice quickly | Documented behaviour: one record (idempotency) or a clear duplicate rule |

## Status codes to verify

`200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `415` (wrong content type), `429` (if rate limiting exists), `5xx` must never appear for bad input.

## Schema validation

- Validate every response against the JSON schema derived from the contract: required fields, types, enums, nullable fields.
- Check that no unexpected fields appear (for example internal IDs, other users' data).
- Postman: `tv4`/`ajv`-style schema assertion in the test script. REST Assured: JSON-schema validator matcher.

## Data validation

- Values returned equal values sent (including trimming, encoding and special characters).
- Created data is visible through the UI and, where access is allowed, in the database (one row, correct foreign keys).
- Timestamps use the documented format and time zone.
- Pagination: `total`, `page`, `size` are consistent with the actual items.

## Performance smoke check

Not load testing. A basic sanity check only:
- Record response time of the main calls in the Postman runner.
- Flag anything above the agreed threshold (TODO: team-agreed value, for example 1 s for `GET`, 2 s for `POST`).
- Escalate suspected issues to the performance-testing owner.

## Security notes

- Authorisation matrix: every role against every method (including access to other users' records, an IDOR check).
- Token handling: expired, tampered and missing tokens.
- Input handling: very long strings, special characters, script-like and SQL-like input must be rejected or safely handled.
- Error responses must not leak stack traces or internal details.
- Sensitive values stay out of URLs and logs.
- A deeper security assessment belongs to a security specialist.

## Execution and reporting

- Postman collection runs on demand and, where the team has CI, in the pipeline (Newman, Jenkins or GitHub Actions).
- Failures are reported as defects with the request, response, environment and a timestamp.
- Keep the collection in version control next to the test documentation.
