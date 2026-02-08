# ADR 001: Architecture Decisions

## Status
Accepted

## Context
We needed a robust automated testing framework for the SauceDemo e-commerce platform. The goal was to simulate real-world user flows (E2E) while maintaining high maintainability, security, and stability in CI environments.

## Decision
We chose **Playwright** with **TypeScript** implementing **Page Object Model (POM)** and **Static Factory Methods**.

### Why Playwright vs Selenium?
* **Speed:** Direct communication with browser CDP (Chrome DevTools Protocol).
* **Stability:** Auto-waiting mechanism and network interception capabilities reduce flakiness.
* **Tooling:** Built-in trace viewer, visual regression testing, and HTML reporting.

### Why POM + Fixtures?
* **POM:** Decouples test logic from HTML implementation details.
* **Fixtures:** Enables clean Dependency Injection. We avoid `beforeEach` boilerplate and ensure each test gets a fresh, isolated environment.

### Why Factory Method (and NO Builder)?
* **Decision:** We initially considered the Builder pattern but rejected it in favor of **Static Factory Methods**.
* **Reasoning (KISS):** SauceDemo users are static entities defined by the system (`standard_user`, `locked_out_user`). A Builder implies dynamic object construction which is unnecessary here. A simple Factory (`UserFactory.createStandardUser()`) provides better readability and less boilerplate code.

### Security & Configuration
* **Environment Variables:** Sensitive data (passwords) are strictly managed via `.env` files locally and **GitHub Secrets** in CI. Hardcoding credentials is forbidden.
* **Quality Gates:** We use **Husky**, **ESLint**, and **Prettier** to enforce code style and prevent bad commits.

## Consequences
* **Positive:** The architecture is lightweight and focused on business logic. Security risks are minimized.
* **Negative:** Adding a completely new user type requires modifying the Factory class, though this is rare in this specific project context.