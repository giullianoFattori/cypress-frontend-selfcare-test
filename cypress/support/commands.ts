type StepCallback<T = unknown> = () => Cypress.Chainable<T> | T | void;

const isChainable = <T = unknown>(value: unknown): value is Cypress.Chainable<T> => {
  return Boolean(value) && typeof (value as Cypress.Chainable).then === "function";
};

Cypress.Commands.add("byTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("step", (label: string, callback?: StepCallback) => {
  Cypress.log({ name: "step", message: label });

  if (!callback) {
    return cy.wrap(null, { log: false });
  }

  const result = callback();
  if (isChainable(result)) {
    return result;
  }

  return cy.wrap(result, { log: false });
});

Cypress.Commands.add("loginByApi", (email: string, password: string) => {
  cy.session(
    `login-${email}`,
    () => {
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiBaseUrl")}/login`,
        body: { email, password },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        const { token } = response.body as { token: string };
        cy.window().then((win) => win.localStorage.setItem("auth_token", token));
      });
    },
    { cacheAcrossSpecs: true }
  );
});

Cypress.Commands.add("fixtureTyped", <T>(fixturePath: string) => {
  return cy.fixture(fixturePath).then((data) => data as T);
});
