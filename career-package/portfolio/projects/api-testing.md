# API Testing (REST and SOAP)

**Evidence level: training certificate and CV statements. No public API test repository exists yet.** This page is an honest placeholder plus a worked plan. The two repositories named for web services (`wsTestUser`, `WS-HW`) contain only a README, so they are not presented as work.

## Project Overview

API testing is part of my daily QA work according to my CV (REST and SOAP, Postman, SoapUI, REST Assured). What I can show publicly today:

- Training: *Web Services Testing (Foundation Level)*, Pragmatic, and a 2017 automation course whose programme included manual and automated web-service testing.
- A fictional but realistic API test plan: [`samples/sample-api-test-plan.md`](../samples/sample-api-test-plan.md).
- HTTP-level integration tests in a small Node.js app (Mocha with node-fetch), run in GitHub Actions: https://github.com/PlamenTanevGit/01.Student-Registry-App

## Problem / Context

UI tests are slow and fragile for checking business rules, data and permissions. API tests catch those problems earlier and run in seconds. They also give a stable way to prepare test data for UI and manual testing.

## Tools Used

- Postman (collections, environments, test scripts), SoapUI (SOAP/WSDL)
- REST Assured (Java), Mocha with node-fetch (JavaScript)
- JSON, XML, SQL for data checks

## QA Approach

1. Start from the contract (Swagger/OpenAPI or the API document) and the acceptance criteria.
2. Cover positive, negative, boundary, authorisation and schema cases per endpoint.
3. Assert status code, response body, headers and a simple response-time sanity check.
4. Verify persisted data through the UI or a SQL query.
5. Keep collections in version control and run them in CI where the team has it.

## What Was Tested

Public portfolio evidence is limited to the Node.js integration tests: page availability and content, form fields, adding a valid student and rejecting an invalid one (with an error message and an unchanged student count).

## Example Scenarios

1. `POST` a valid resource, then `GET` it and compare the data.
2. `POST` with a missing mandatory field and expect a `400` with a clear message.
3. Call an endpoint without a token, with an expired token and with the wrong role.
4. Send the same `POST` twice quickly and check for duplicates.

## Example Test Cases

| ID | Title | Expected |
|---|---|---|
| API-01 | Create with valid data | `201`, response echoes data, `GET` returns the same data |
| API-02 | Missing mandatory field | `400`, field-level error message |
| API-03 | No authentication token | `401` |
| API-04 | Wrong role | `403` |
| API-05 | Unknown ID | `404` |

Full plan: see the sample API test plan.

## Business Value

No production results are claimed on this page. The sample plan shows how I structure API coverage so that regression is fast and risks (permissions, data integrity) are tested early.

## What I Would Improve Next

- Publish a Postman collection against a public practice API, with test scripts, environments and a Newman run in GitHub Actions.
- Add a small REST Assured project with schema validation.
- Add a SoapUI project for a public SOAP service.
- Write a short article on the API test pyramid from a QA point of view.

## Repository / Demo Link

- Related: https://github.com/PlamenTanevGit/01.Student-Registry-App (HTTP integration tests, practice project)
- TODO: add a public Postman collection or API test repository.

## Screenshots

TODO: Add a Postman runner screenshot after publishing a collection.

## TODOs

- [ ] Create and publish the Postman collection.
- [ ] Confirm REST Assured and SoapUI claims on the CV with a concrete, non-confidential example.
- [ ] Add the web-services certificate date.
