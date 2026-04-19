import loginScreenPage from '../../pages/LoginScreen/LoginScreenPage';
import { LOGIN_USERS, getFixtureUser, stubSuccessfulLogin } from '../../support/loginTestUtils';

describe('LoginScreen E2E', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    loginScreenPage.visit();
  });

  it('shows validation error when required fields are empty', () => {
    loginScreenPage.submit();

    loginScreenPage.getErrorAlert().should('contain.text', 'Proszę wypełnić wszystkie pola');
  });

  it('shows validation error when email format is invalid', () => {
    loginScreenPage.typeEmail('invalid-email');
    loginScreenPage.typePassword('whatever123');
    loginScreenPage.submit();

    loginScreenPage.getErrorAlert().should('contain.text', 'Proszę podać prawidłowy adres email');
  });

  LOGIN_USERS.forEach(({ role, fixture }) => {
    it(`logs in successfully for ${role} user from fixture data`, () => {
      getFixtureUser(fixture).then(({ email, password }) => {
        stubSuccessfulLogin(role, email);

        cy.clock();
        loginScreenPage.login(email, password);

        cy.wait('@loginRequest');
        loginScreenPage.getSuccessAlert().should('contain.text', 'Zalogowano pomyślnie!');

        cy.tick(600);
        cy.wait('@profileRequest');
        cy.url().should('include', '/home');
      });
    });
  });

  it('navigates to reset password and register screens from action links', () => {
    loginScreenPage.getResetPasswordButton().click();
    cy.url().should('include', '/reset-password');

    loginScreenPage.visit();
    loginScreenPage.getRegisterButton().click();
    cy.url().should('include', '/register');
  });

  it('supports repeatable login and logout via GUI commands for every role', () => {
    const loginViaGuiByRole: Record<'admin' | 'client' | 'manager' | 'mechanic', () => void> = {
      admin: () => cy.LoginViaGuiAdmin(),
      client: () => cy.LoginViaGuiClient(),
      manager: () => cy.LoginViaGuiManager(),
      mechanic: () => cy.LoginViaGuiMechanic(),
    };

    (Object.keys(loginViaGuiByRole) as Array<'admin' | 'client' | 'manager' | 'mechanic'>).forEach((role) => {
      loginScreenPage.visit();
      loginViaGuiByRole[role]();
      cy.url().should('include', '/home');
      cy.logoutViaGui();
    });
  });
});
