class LoginScreenPage {
  visit(): void {
    cy.visit('/login');
    this.getRoot().should('be.visible');
  }

  getRoot() {
    return cy.get('[data-e2e="LoginScreen-root-container"]');
  }

  getEmailInput() {
    return cy.get('[data-e2e="LoginScreen-email-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-e2e="LoginScreen-password-input"]');
  }

  getSubmitButton() {
    return cy.get('[data-e2e="LoginScreen-login-submit-button"]');
  }

  getErrorAlert() {
    return cy.get('[data-e2e="LoginScreen-error-alert"]');
  }

  getSuccessAlert() {
    return cy.get('[data-e2e="LoginScreen-success-alert"]');
  }

  getResetPasswordButton() {
    return cy.get('[data-e2e="LoginScreen-reset-password-button"]');
  }

  getRegisterButton() {
    return cy.get('[data-e2e="LoginScreen-register-button"]');
  }

  typeEmail(email: string): void {
    this.getEmailInput().clear().type(email);
  }

  typePassword(password: string): void {
    this.getPasswordInput().clear().type(password);
  }

  submit(): void {
    this.getSubmitButton().click();
  }

  login(email: string, password: string): void {
    this.typeEmail(email);
    this.typePassword(password);
    this.submit();
  }
}

export default new LoginScreenPage();
