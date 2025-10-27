import "cypress-mochawesome-reporter/register";

import "./commands";
import { registerGlobalIntercepts } from "./intercepts";

registerGlobalIntercepts();

Cypress.on("uncaught:exception", (error) => {
  // Lanca erro somente quando nao for excecao conhecida
  const knownReactErrors = ["ResizeObserver loop limit exceeded"];
  if (knownReactErrors.some((message) => error.message.includes(message))) {
    return false;
  }

  return true;
});
