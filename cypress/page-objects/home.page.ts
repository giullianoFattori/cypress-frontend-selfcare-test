import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  private readonly heroSelector = "h1";
  private readonly navSelector = ".navbar";

  constructor() {
    super("/");
  }

  assertHeroVisible(): void {
    cy.get(this.heroSelector).should("contain.text", "Kitchen Sink");
  }

  goToActions(): void {
    cy.get(this.navSelector).contains("Commands").click();
    this.assertUrlContains("/commands/actions");
  }
}
