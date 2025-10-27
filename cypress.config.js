const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    baseUrl: process.env.BASE_URL,
    env: {
      USER_ID_1: process.env.USER_ID_1,
      USER_ID_2: process.env.USER_ID_2,
      USER_NAME_1: process.env.USER_NAME_1,
      USER_NAME_2: process.env.USER_NAME_2,
      USER_EMAIL_1: process.env.USER_EMAIL_1,
      USER_EMAIL_2: process.env.USER_EMAIL_2,
      USER_AVATAR_1: process.env.USER_AVATAR_1,
      USER_AVATAR_2: process.env.USER_AVATAR_2,
      USER_TOKEN_1: process.env.USER_TOKEN_1,
      USER_TOKEN_2: process.env.USER_TOKEN_2,
      WAS_ON_BOARDED: process.env.WAS_ON_BOARDED,
      IS_AUTHENTICATED: process.env.IS_AUTHENTICATED
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
  reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportpagetitle: "Reporte",
      embeddedScreenshots: true,
      inlineAssets: true,
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false,
    },
  env: {
    // --> Variables de entorno para los fixtures
    assertsJson: "asserts",
    datosJson: "datos"
  }
});
