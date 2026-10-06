# Selenium Java Test Framework (Page Object Model)

**Evidence level: real public repository.** Findings come from reading the repositories on 2026-10-01.

## Project Overview

A Java, Selenium WebDriver and TestNG framework using the Page Object Model, built against a public demo e-commerce site (`ecommerce-playground.lambdatest.io`). The refactored version lives in `LamdaTestRefact`. Earlier, broader snapshots are in `LambdaTest` and `ShoppingDemo`.

## Problem / Context

Practice and refactoring project: take a growing set of shopping tests and give them a clean structure (pages, utilities, listeners, data providers, configuration) that is easy to extend and run in parallel. The tests run on local Chrome or Firefox through WebDriverManager. They do not use the LambdaTest cloud grid, despite the repo name.

## Tools Used

- Java, Selenium WebDriver 3.141.59, TestNG 7.1.0, Maven (profiles `stage` and `test` with filtered config files)
- WebDriverManager, JavaFaker, OpenCSV, Apache POI (Excel)
- ExtentReports and ReportNG reporting, Log4j
- TestNG listeners, `SoftAssert`, `ThreadLocal<WebDriver>`

## QA Approach

- **Layered structure:** `Pages` (13 page objects such as home, login, search results, cart, checkout, order confirmation, account), `Utils` (base test, driver factory, helpers, data generators, CSV reader), `Listeners` (reporting and WebDriver event logging), `DataProviders`.
- **Isolation for parallel runs:** a thread-local driver and `parallel="methods"` with two threads in `testng.xml`.
- **Data-driven tests:** TestNG `@DataProvider` and CSV/Excel sources, generated test data with Faker.
- **Configuration per environment:** `config.<env>.properties` selected through Maven profiles.
- **Evidence:** HTML and Extent reports, event-firing driver logging.

## What Was Tested

- Search and product selection, adding and removing items from the cart (single and multiple).
- Price and total calculations: unit price, eco tax, VAT and cart total assertions.
- Empty-cart message after removing items.
- In the earlier snapshots: guest and registered purchase flows with and without VAT, direct checkout, login, continue-shopping.

## Example Scenarios

1. Search for a product, add three items, verify unit prices, tax and total, then remove everything and confirm the "Your shopping cart is empty!" message.
2. Purchase as a guest with VAT versus without VAT and compare totals.
3. Run the same home-page checks with several data rows from a DataProvider.

## Example Test Cases

| ID | Title | Steps (summary) | Expected |
|---|---|---|---|
| SEL-01 | Add and remove multiple items | Search → add 3 items → open cart → remove all | Totals correct at each step; empty-cart message at the end |
| SEL-02 | Price calculation | Add item → open cart | Unit price × quantity + eco tax + VAT equals the displayed total |
| SEL-03 | Guest purchase with VAT | Add item → guest checkout → confirm order | Order success page; totals include VAT |
| SEL-04 | Data-driven home page check | Run with CSV rows | Each data row passes the same assertions |

_IDs are portfolio labels. The scenarios reflect the test classes in the repositories (add/remove items, calculations, purchase flows)._

## Business Value

This is a practice framework on a public demo site, so no production results are claimed. It demonstrates the structure I use for maintainable UI automation: separation of page logic and tests, per-environment configuration, parallel-safe drivers, data-driven tests and readable reports.

## What I Would Improve Next

- Upgrade to Selenium 4 and a current TestNG, and use explicit waits through a small wait helper.
- Add a README and a CI workflow (GitHub Actions) with a scheduled run and report upload.
- Re-enable and finish the commented-out tests left from the refactor.
- Move test data out of code where possible and tag tests (smoke, regression).
- Add API-level setup for test data, so UI tests focus on the user flow.
- Fix the odd class names (`testOercent`) and remove duplicated Extent report libraries.

## Repository / Demo Link

- Refactored: https://github.com/PlamenTanevGit/LamdaTestRefact
- Earlier version: https://github.com/PlamenTanevGit/LambdaTest
- Demo: none (target is the public demo site)

## Screenshots

TODO: Add a screenshot of the project structure and one Extent report. See `assets/placeholders/project-screenshot-placeholders.md`.

## TODOs

- [ ] Add README and CI.
- [ ] Add report screenshot.
- [ ] Confirm that the work is entirely your own and not from a course, and describe it accordingly.
