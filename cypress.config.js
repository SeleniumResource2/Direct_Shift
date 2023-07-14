const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E2E Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  retries:{
    runMode: 0,
    openMode: 0
  },
  e2e: {
    "baseUrl":"https://app.pws.int.cruk.org/support-us/your-donation",       
    "watchForFileChanges" : false,
    "chromeWebSecurity": false,
    "pageLoadTimeout": 120000,
    "video": true,
    "defaultCommandTimeout": 10000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
    },
  },
});
