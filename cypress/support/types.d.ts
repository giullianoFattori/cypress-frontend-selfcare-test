/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject = unknown> {
    byTestId<E extends Element = HTMLElement>(testId: string): Chainable<JQuery<E>>;
    step<T = unknown>(label: string, callback?: () => Chainable<T> | T | void): Chainable<T>;
    loginByApi(email: string, password: string): Chainable<void>;
    fixtureTyped<T>(fixturePath: string): Chainable<T>;
  }
}
