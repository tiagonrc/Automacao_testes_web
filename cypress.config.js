const { defineConfig } = require('cypress');
module.exports = defineConfig({
  viewportWidth: 1440, viewportHeight: 1000,
  defaultCommandTimeout: 15000, pageLoadTimeout: 90000,
  video: false, screenshotOnRunFailure: true, retries: 0,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: { reportDir: 'reports', reportFilename: 'index', embeddedScreenshots: true, inlineAssets: true, saveJson: true },
  e2e: {
    baseUrl: 'https://automationexercise.com', testIsolation: true,
    setupNodeEvents(on, config) { require('cypress-mochawesome-reporter/plugin')(on); return config; }
  }
});
