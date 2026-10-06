# Cypress Testing

**Evidence level: learning notes only. No public Cypress repository exists yet.** This page is an honest case-study placeholder. It does not claim a delivered project.

## Project Overview

A study and practice track for Cypress with JavaScript. What exists today:

- Self-written notes in Google Drive (`Cypress.docx`) comparing Cypress with Selenium and covering setup, Mocha and Chai, locators, dropdowns, checkboxes, iframes and reporting tools.
- A written evaluation of a Cypress course and a research guide on advanced Cypress (page objects versus custom commands, multi-tab limits, missing `cy.intercept` coverage).
- The notes use public practice sites as examples.

A planned portfolio project is described below.

## Problem / Context

Teams choose between Selenium, Cypress and Playwright. I wanted a grounded view of where Cypress fits (fast feedback for front-end heavy apps, simple setup, runs in the browser's run loop) and where it does not (single-tab model, browser coverage, testing outside the app's origin).

## Tools Used

- Cypress, JavaScript, Mocha, Chai
- Reporting options studied: Mochawesome, Allure
- Jenkins integration studied (notes only)

## QA Approach

- Select elements with stable attributes first; use XPath only through a plugin when needed.
- Keep tests independent; set up state through requests instead of the UI where possible.
- Compare page objects with custom commands and choose per project size.

## What Was Tested

Not yet delivered as a repository. Planned target: a public practice site that allows test traffic.

## Example Scenarios

_Planned for the practice project:_
1. Log in and log out with valid and invalid credentials.
2. Fill a form with dropdowns and checkboxes and verify validation messages.
3. Verify an iframe-based widget.
4. Intercept a network call and assert on the response.

## Example Test Cases

| ID | Title | Expected |
|---|---|---|
| CY-01 (planned) | Login with valid credentials | User reaches the account page |
| CY-02 (planned) | Login with invalid password | Error message shown; user stays on the login page |
| CY-03 (planned) | Form validation | Required fields flagged; successful submit shows confirmation |

## Business Value

No business value is claimed for this page. The value is a clear understanding of trade-offs, which helps when advising a team on tool choice.

## What I Would Improve Next

- Build the practice repository with 10–15 meaningful specs, a README and a GitHub Actions run.
- Add network stubbing with `cy.intercept` and API-level login.
- Publish the "Cypress vs Selenium vs Playwright" notes as a short, public write-up.

## Repository / Demo Link

TODO: no repository yet. Add the link when the practice project is published.

## Screenshots

TODO: Add a Cypress runner screenshot after the practice project exists.

## TODOs

- [ ] Create and publish the Cypress practice repository.
- [ ] If you have real Cypress work from a job (not confidential), describe it here with permission.
- [ ] Decide whether to keep Cypress as a headline skill on the CV or mark it "working knowledge".
