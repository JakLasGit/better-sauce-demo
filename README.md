# 🎭 Better Sauce Demo - Advanced Playwright Automation

![Playwright](https://img.shields.io/badge/Playwright-1.40+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CI/CD](https://github.com/JakLasGit/better-sauce-demo/actions/workflows/playwright.yml/badge.svg)

A scalable, production-grade test automation framework for [SauceDemo](https://www.saucedemo.com/), demonstrating modern SDET practices including **Page Object Model**, **Fixtures**, **Factory Pattern**, and **CI/CD integration**.

---

## 🚀 Why this project?
This repository is not just a collection of tests; it is a proof of concept for a scalable test architecture. It solves common automation challenges such as:
* **Flakiness** (handled via dynamic waits and Playwright auto-waiting).
* **Data Management** (using Factory and Builder patterns instead of hardcoded JSONs).
* **Code Duplication** (abstracted logic into Page Objects and Fixtures).
* **Floating Point Math** (handling JS currency calculation issues).

## 🏗️ Architecture & Design Patterns

The framework relies on strong typing and separation of concerns:

| Pattern | Usage in Project |
|:---|:---|
| **Page Object Model (POM)** | Encapsulates page locators and interactions (`pages/`). Tests read like business requirements. |
| **Test Fixtures** | Dependency injection for Pages and Users. |
| **Factory Pattern** | Centralized creation of test data (`UserFactory.createStandardUser()`). Simplifies test setup. |
| **Builder Pattern** | Fluent interface for constructing complex data objects (`UserBuilder.setUsername()...`). |
| **DTO (Data Transfer Object)** | Strictly typed interfaces for models (`models/user.model.ts`). |

### Project Structure
```text
tests/
├─ e2e/
│  ├─ auth/            # Security & Login scenarios
│  ├─ cart/            # Cart state management tests
│  ├─ checkout/        # Full purchase flows & financial calculations
│  ├─ inventory/       # Sorting logic & product verification
│  └─ performance/     # Handling 'glitch' users & timeouts
pages/                 # Page Objects (locators & methods)
fixtures/              # Playwright fixtures (DI container)
factories/             # Predefined data sets (Standard, Locked, Glitch users)
builders/              # Flexible data generators
models/                # TypeScript interfaces
utils/                 # Helpers (e.g., currency parsing)
.github/workflows/     # CI/CD Pipeline configuration
```

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