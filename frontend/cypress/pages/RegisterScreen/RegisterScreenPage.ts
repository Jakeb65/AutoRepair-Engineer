class RegisterScreenPage {
  visit(): void {
    cy.visit('/register');
    this.getRoot().should('be.visible');
  }

  getRoot() {
    return cy.get('[data-e2e="RegisterScreen-root-container"]');
  }

  getEmailInput() {
    return cy.get('[data-e2e="RegisterScreen-email-input"]');
  }

  getFirstNameInput() {
    return cy.get('[data-e2e="RegisterScreen-first-name-input"]');
  }

  getLastNameInput() {
    return cy.get('[data-e2e="RegisterScreen-last-name-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-e2e="RegisterScreen-password-input"]');
  }

  getConfirmPasswordInput() {
    return cy.get('[data-e2e="RegisterScreen-confirm-password-input"]');
  }

  getSubmitButton() {
    return cy.get('[data-e2e="RegisterScreen-register-submit-button"]');
  }

  getErrorAlert() {
    return cy.get('[data-e2e="RegisterScreen-error-alert"]');
  }

  getSuccessAlert() {
    return cy.get('[data-e2e="RegisterScreen-success-alert"]');
  }

  getPasswordStrengthText() {
    return cy.get('[data-e2e="RegisterScreen-password-strength-text"]');
  }

  getPasswordMatchText() {
    return cy.get('[data-e2e="RegisterScreen-password-match-text"]');
  }

  getLoginButton() {
    return cy.get('[data-e2e="RegisterScreen-login-button"]');
  }

  typeEmail(email: string): void {
    this.getEmailInput().clear().type(email);
  }

  typeFirstName(firstName: string): void {
    this.getFirstNameInput().clear().type(firstName);
  }

  typeLastName(lastName: string): void {
    this.getLastNameInput().clear().type(lastName);
  }

  typePassword(password: string): void {
    this.getPasswordInput().clear().type(password);
  }

  typeConfirmPassword(confirmPassword: string): void {
    this.getConfirmPasswordInput().clear().type(confirmPassword);
  }

  submit(): void {
    this.getSubmitButton().click();
  }

  register(email: string, firstName: string, lastName: string, password: string, confirmPassword: string): void {
    this.typeEmail(email);
    this.typeFirstName(firstName);
    this.typeLastName(lastName);
    this.typePassword(password);
    this.typeConfirmPassword(confirmPassword);
    this.submit();
  }
}

export default new RegisterScreenPage();