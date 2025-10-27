import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin";
import { config as loadEnv } from "dotenv";

loadEnv();

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports/mochawesome",
    charts: true,
    reportPageTitle: "Cypress Frontend Selfcare - Report",
    embeddedScreenshots: true,
    inlineAssets: true
  },
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  e2e: {
    baseUrl: process.env.APP_BASE_URL ?? "https://example.cypress.io",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    }
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL ?? "https://reqres.in/api"
  }
});
