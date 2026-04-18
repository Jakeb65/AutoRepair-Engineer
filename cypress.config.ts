import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    allowCypressEnv: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    env: {
      apiUrl: 'http://localhost:3000',
      adminEmail: 'admin@example.com',
      adminPassword: '@Admin123',
      clientEmail: 'client1@example.com',
      clientPassword: 'Klient123',
      managerEmail: 'manager1@example.com',
      managerPassword: 'Mgr12345',
      mechanicEmail: 'mechanic1@example.com',
      mechanicPassword: 'Mech1234',
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
