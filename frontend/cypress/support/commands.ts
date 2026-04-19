/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      loginViaGui(email: string, password: string): Chainable<void>;
      logoutViaGui(): Chainable<void>;
      LoginViaGuiAdmin(): Chainable<void>;
      LoginViaGuiClient(): Chainable<void>;
      LoginViaGuiManager(): Chainable<void>;
      LoginViaGuiMechanic(): Chainable<void>;
    }
  }
}

/**
 * Login via UI form
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-e2e="LoginScreen-email-input"]').type(email);
  cy.get('[data-e2e="LoginScreen-password-input"]').type(password);
  cy.get('[data-e2e="LoginScreen-login-submit-button"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('loginViaGui', (email: string, password: string) => {
  cy.login(email, password);
});

Cypress.Commands.add('logoutViaGui', () => {
  cy.get('[data-e2e="HomeScreen-logout-button"]').should('be.visible').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('LoginViaGuiAdmin', () => {
  cy.fixture('admin-user').then((user) => cy.loginViaGui(user.email, user.password));
});

Cypress.Commands.add('LoginViaGuiClient', () => {
  cy.fixture('client-user').then((user) => cy.loginViaGui(user.email, user.password));
});

Cypress.Commands.add('LoginViaGuiManager', () => {
  cy.fixture('manager-user').then((user) => cy.loginViaGui(user.email, user.password));
});

Cypress.Commands.add('LoginViaGuiMechanic', () => {
  cy.fixture('mechanic-user').then((user) => cy.loginViaGui(user.email, user.password));
});

export {};
