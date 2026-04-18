/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      loginAsClient(): Chainable<void>;
      loginAsManager(): Chainable<void>;
      loginAsMechanic(): Chainable<void>;
    }
  }
}

/**
 * Login via UI form
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.fixture('admin-user').then((user) => cy.login(user.email, user.password));
});

Cypress.Commands.add('loginAsClient', () => {
  cy.fixture('client-user').then((user) => cy.login(user.email, user.password));
});

Cypress.Commands.add('loginAsManager', () => {
  cy.fixture('manager-user').then((user) => cy.login(user.email, user.password));
});

Cypress.Commands.add('loginAsMechanic', () => {
  cy.fixture('mechanic-user').then((user) => cy.login(user.email, user.password));
});

export {};
