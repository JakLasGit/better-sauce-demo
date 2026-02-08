# ADR 001: Architecture Decisions

## Status
Accepted

## Context
We needed a robust automated testing framework for the SauceDemo e-commerce platform. The goal was to simulate real-world user flows (E2E) while maintaining high maintainability and stability in CI environments.

## Decision
We chose **Playwright** with **TypeScript** implementing **Page Object Model (POM)** and **Fixtures**.

### Why Playwright vs Selenium?
* **Speed:** Direct communication with browser CDP (Chrome DevTools Protocol).
* **Stability:** Auto-waiting mechanism reduces flakiness significantly.
* **Tooling:** Built-in trace viewer and report generator.

### Why POM + Fixtures?
* **POM:** Decouples test logic from HTML implementation details.
* **Fixtures:** Enables clean Dependency Injection. We avoid `beforeEach` boilerplate and ensure each test gets a fresh, isolated environment.

### Why specific "Data Builders"?
* Using Factory/Builder patterns prevents strict dependency on static JSON files, allowing for dynamic data generation (randomized) if needed in the future.

## Consequences
* **Positive:** Tests are readable by non-technical stakeholders (Business Language).
* **Negative:** Higher initial setup time compared to simple record-and-playback scripts.