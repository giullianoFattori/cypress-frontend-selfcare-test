# Cypress Frontend Selfcare Test

Frontend automation skeleton ready to run with Cypress and TypeScript. It follows Playwright-inspired best practices, applies the Page Object Model, exposes an API consumption layer, ships with reusable helpers, linting, reporting, and a GitHub Actions pipeline.

## Requirements
- Node.js >= 18.18
- npm >= 9

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the sample environment file and adjust it to your target environment:
   ```bash
   cp cypress.env.example.json cypress.env.json
   ```
   Set `APP_BASE_URL` and `API_BASE_URL` as needed.
3. Run the smoke suite in headless mode:
   ```bash
   npm run test:ci -- --spec cypress/e2e/smoke/healthcheck.cy.ts
   ```
4. Open the interactive Cypress runner:
   ```bash
   npm run test:open
   ```

## Project Scripts
- `npm run test:open` starts the Cypress GUI runner.
- `npm run test:run` executes all specs headless with the configured reporter.
- `npm run test:ci` runs specs headless and prepares Mochawesome reports.
- `npm run lint` checks TypeScript and Cypress code style.
- `npm run lint:fix` auto-fixes lint issues when possible.

## Example: Writing and Running a Test
The template ships with a smoke test suite at `cypress/e2e/smoke/healthcheck.cy.ts`. It demonstrates:
- Instantiating a page object (`HomePage`) and calling high-level actions.
- Wrapping assertions inside `cy.step` helpers for clearer logging.
- Mixing UI and API validations by reusing the shared `usersApi`.

To run only that suite:
```bash
npm run test:run -- --spec cypress/e2e/smoke/healthcheck.cy.ts
```

## Creating a New Test
1. **Model your screen:** create a page object under `cypress/page-objects/`. Extend `BasePage`, declare element getters (prefer `data-testid` selectors via `byTestId`), and expose reusable methods.
2. **Add fixtures (optional):** store static data inside `cypress/fixtures/` and load it via `cy.fixtureTyped`.
3. **Implement the test:** create a new spec in `cypress/e2e/<feature>/<name>.cy.ts`, import the page object, and use helpers like `cy.step`, `cy.loginByApi`, and `testDataBuilder`.
4. **Use API clients when needed:** extend the `cypress/api/` layer to centralize REST calls.
5. **Run lint and tests:** `npm run lint` followed by `npm run test:run -- --spec <path>` before pushing changes.

## Project Structure
```
cypress/
  api/               -> Shared Axios client and domain-specific API helpers (example: usersApi)
  e2e/               -> Organized spec suites (example: smoke)
  fixtures/          -> Reusable data payloads
  page-objects/      -> Page Object Model implementations
  support/
    commands.ts      -> Custom Cypress commands (byTestId, step, loginByApi, fixtureTyped)
    e2e.ts           -> Global hooks, reporter registration, intercept wiring
    intercepts.ts    -> Default intercept definitions
    utils/           -> Test data builders and utilities
```

## Helpers at a Glance
- `cy.step` adds structured logging for each test action.
- `cy.byTestId` standardizes DOM access via `data-testid`.
- `cy.loginByApi` caches authenticated sessions across specs.
- `cy.fixtureTyped` returns strongly typed fixture data.
- `testDataBuilder` (Faker powered) generates dynamic inputs.
- `HttpClient` centralizes REST communication with Axios.

## Reporting
Headless runs store JSON and HTML Mochawesome reports under `reports/mochawesome`. After `npm run test:ci`, merge and HTML artifacts are generated automatically.

## Continuous Integration
The workflow at `.github/workflows/ci.yml` lints the codebase, shards Cypress specs across two parallel jobs, and uploads Mochawesome results as GitHub Actions artifacts. Adjust the shard matrix as new suites are added.

## Support This Project
If this starter saves you time, consider buying me a coffee:

- Direct link: https://wise.com/pay/me/giullianof9
- Scan the QR code below:

  [![Buy me a coffee QR code](assets/coffee-qr.png)](https://wise.com/pay/me/giullianof9)

## Suggested Next Steps
- Add more page objects using `BasePage`.
- Extend the API layer with product-specific endpoints.
- Configure secure environment variables in your CI environment (for example `API_BASE_URL`).
