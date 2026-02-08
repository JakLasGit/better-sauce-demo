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
| **Test Fixtures** | Dependency injection for Pages and Users. No more `beforeEach` boilerplate (`fixtures/test.ts`). |
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