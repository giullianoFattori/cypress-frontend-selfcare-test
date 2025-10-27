import "@support/commands";

export abstract class BasePage {
  constructor(private readonly path: string) {}

  open(queryParams: Record<string, string | number | boolean> = {}): void {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const targetUrl = searchParams.size
      ? `${this.path}?${searchParams.toString()}`
      : this.path;

    cy.visit(targetUrl);
  }

  protected getByTestId<T extends string>(testId: T): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.byTestId(testId);
  }

  protected assertUrlContains(fragment: string): void {
    cy.url().should("include", fragment);
  }

  protected waitForSkeletonToDisappear(selector: string): void {
    cy.get(selector, { timeout: 10000 }).should("not.exist");
  }
}
