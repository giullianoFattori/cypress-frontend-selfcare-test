type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface InterceptOptions {
  method: HttpMethod;
  url: string;
  alias: string;
  fixture?: string;
  statusCode?: number;
  delayMs?: number;
}

const defaultIntercepts: InterceptOptions[] = [
  // Adicione interceptacoes globais aqui conforme necessario
];

const applyIntercept = ({
  method,
  url,
  alias,
  fixture,
  statusCode = 200,
  delayMs = 0
}: InterceptOptions): void => {
  cy.intercept(
    method,
    url,
    fixture
      ? {
          fixture,
          delayMs,
          statusCode
        }
      : undefined
  ).as(alias);
};

export const registerGlobalIntercepts = (): void => {
  beforeEach(() => {
    defaultIntercepts.forEach(applyIntercept);
  });
};
