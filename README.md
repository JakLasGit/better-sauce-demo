# 🎭 Better Sauce Demo - Enterprise Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.40+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CI/CD](https://github.com/JakLasGit/better-sauce-demo/actions/workflows/playwright.yml/badge.svg)
![Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?style=for-the-badge&logo=github)

A production-grade test automation framework for [SauceDemo](https://www.saucedemo.com/), demonstrating modern SDET practices including **Page Object Model** and **Fixtures**.

> **Live Report:** [View the latest Test Report](https://jaklasgit.github.io/better-sauce-demo/)

---

## 🚀 Why this architecture?
This project demonstrates how to solve real-world automation challenges, prioritizing **Stability**, **Security**, and **Simplicity (KISS)**:

* **Security First:** No hardcoded passwords. Credentials are managed via `.env` locally and **GitHub Secrets** on CI.
* **Flakiness** handled via dynamic waits and Playwright auto-waiting.
* **Data Management** (using Factory pattern instead of hardcoded JSONs).
* **Code Quality:** Enforced via **ESLint**, **Prettier**, and **Husky** (pre-commit hooks).
* **Floating Point Math:** Handles JavaScript currency calculation issues using specific utility functions.

## 🏗️ Design Patterns

The framework relies on strong typing and separation of concerns:

| Pattern | Usage in Project |
|:---|:---|
| **Page Object Model (POM)** | Encapsulates page locators and interactions (`pages/`). Tests read like business requirements. |
| **Test Fixtures** | Dependency injection for Pages and Users. Eliminates `beforeEach` boilerplate (`fixtures/test.ts`). |
| **Static Factory** | Centralized creation of test data (`UserFactory.createStandardUser()`). Replaces complex Builders for static data (KISS). |
| **DTO (Data Transfer Object)** | Strictly typed interfaces for models (`models/user.model.ts`). |

### 📂 Project Structure
```text
tests/
├─ e2e/
│  ├─ auth/            # Security, Negative Login flows
│  ├─ cart/            # Cart state management
│  ├─ checkout/        # Purchase flows & financial calculations
│  ├─ inventory/       # Sorting logic & product verification
│  └─ performance/     # Handling 'glitch' users & timeouts
└─ legacy/             # Spaghetti test for comparison
pages/                 # Page Objects (locators & methods)
fixtures/              # Playwright fixtures (DI container)
factories/             # Secure User Data Factory
utils/                 # Helpers (e.g., currency parsing)
docs/adr/              # Architecture Decision Records
.github/workflows/     # CI/CD Pipeline configuration
```
## 💡 Why this architecture? (Business Value)

This project is not just about clicking buttons; it demonstrates a mature approach to Quality Assurance engineering:

1.  **Separation of Concerns:** Test intent ("User buys a bag") is separated from implementation ("Click div #id-123"). This means UI changes don't break the logic of the test, only the page object locator.
2.  **Scalability:** The use of **Fixtures** means we can scale to hundreds of tests without duplicating setup code.
3.  **Flakiness Resistance:** Custom retry strategies and Playwright's auto-waiting mechanisms ensure that CI builds stay green unless there is a real bug.
4.  **Type Safety:** TypeScript interfaces (`User.model.ts`) ensure that we never pass invalid data structures to our tests, catching errors at compile time, not runtime.

### 🚫 Why NOT BDD (Cucumber/Gherkin)?
While BDD is popular, this project consciously chooses **pure TypeScript** because:
* **Complexity:** Gherkin adds an extra layer of abstraction (Regex matching steps) that complicates debugging.
* **Speed:** Direct code execution is faster and easier to trace than parsing `.feature` files.
* **Target Audience:** For this specific project, the goal is technical excellence and maintainability for SDETs, rather than creating non-technical documentation for Product Owners.

## 🛠️ Tech Stack
* Core: Playwright + TypeScript

* Assertion Engine: Jest Expect (built-in Playwright assertions)

* CI/CD: GitHub Actions (runs on Ubuntu-latest)

* Reporting: Playwright HTML Report & Traces

## 🧪 Scenarios Covered
The test suite covers critical business logic, going beyond simple "happy paths":

1.  Money Maker Flow (E2E): Full checkout process validation.

2.  Financial Integrity: Validates if Item Total + Tax exactly matches Total (handling JS floating-point precision issues).

3.  Inventory Sorting: Verifies algorithm correctness for "Price: Low to High" and others.

4.  Negative Testing: Validates form constraints and error handling logic.

5.  Performance Handling: Ensures stability for performance_glitch_user without flaky failures.

6.  Security: Verifies that locked-out users cannot access the application.

## 🏁 Getting Started
Prerequisites
* Node.js (v18 or higher)
* npm

Installation

```
git clone https://github.com/JakLasGit/better-sauce-demo.git
cd better-sauce-demo
npm install
npx playwright install --with-deps
```

## Running Tests
Run all tests in headless mode:
```
npx playwright test
```

Run tests with UI mode (interactive):
```
npx playwright test --ui
```

View the latest test report:
```
npx playwright show-report
```

## ⚙️ CI/CD Pipeline
This project uses GitHub Actions to automatically run tests on every push and pull_request.
* Workflow file: .github/workflows/playwright.yml
* Artifacts: HTML Reports are automatically generated and attached to workflow runs.

Created by Me :) as a showcase of capabilities.
