import { faker } from "@faker-js/faker";

import { usersApi } from "@api/users.api";
import { HomePage } from "@pages/home.page";
import { testDataBuilder } from "@support/utils/test-data";

describe("Smoke | Home page", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.step("Visitar a home page", () => {
      homePage.open();
    });
  });

  it("exibe o cabecalho principal para novos visitantes", () => {
    cy.step("Validar hero visivel", () => {
      homePage.assertHeroVisible();
    });
  });

  it("permite navegacao para area de actions", () => {
    cy.step("Acessar navegacao principal", () => {
      homePage.goToActions();
    });
  });
});

describe("API | Usuarios", () => {
  it("cria um usuario via API reutilizando helper de dados", () => {
    const payload = testDataBuilder.userPayload();

    cy.step("Criar usuario na API", () => {
      usersApi.create(payload).then((response) => {
        expect(response.id).to.match(/[0-9a-f-]+/i);
        expect(response.createdAt).to.not.be.empty;
      });
    });
  });

  it("recupera usuarios paginados", () => {
    const page = faker.number.int({ min: 1, max: 2 });

    cy.step("Listar usuarios via API", () => {
      usersApi.list(page).then((users) => {
        expect(users).to.be.an("array").and.not.to.be.empty;
        users.forEach((user) => {
          expect(user.email).to.include("@");
        });
      });
    });
  });
});
