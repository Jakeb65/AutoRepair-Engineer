import registerScreenPage from '../../pages/RegisterScreen/RegisterScreenPage';

describe('RegisterScreen E2E', () => {
  const validUser = {
    email: 'new.user@example.com',
    firstName: 'Jan',
    lastName: 'Nowak',
    password: 'StrongPass1!',
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    registerScreenPage.visit();
  });

  it('shows validation error when required fields are empty', () => {
    registerScreenPage.submit();

    registerScreenPage.getErrorAlert().should('contain.text', 'Wszystkie pola są wymagane');
  });

  it('shows validation error when email format is invalid', () => {
    registerScreenPage.register('invalid-email', 'Jan', 'Nowak', 'StrongPass1!', 'StrongPass1!');

    registerScreenPage.getErrorAlert().should('contain.text', 'Proszę podać prawidłowy adres email');
  });

  it('shows validation error when password is too weak', () => {
    registerScreenPage.register('new.user@example.com', 'Jan', 'Nowak', 'weak', 'weak');

    registerScreenPage.getErrorAlert().should('contain.text', 'Hasło musi mieć minimum 8 znaków');
  });

  it('shows validation error when passwords do not match', () => {
    registerScreenPage.register('new.user@example.com', 'Jan', 'Nowak', 'StrongPass1!', 'StrongPass2!');

    registerScreenPage.getPasswordMatchText().should('contain.text', 'Hasła są różne');
    registerScreenPage.getErrorAlert().should('contain.text', 'Hasła nie są zgodne');
  });

  it('registers successfully and redirects to login screen', () => {
    cy.intercept('POST', '**/api/auth/register', (req) => {
      expect(req.body).to.deep.include({
        imie: validUser.firstName,
        nazwisko: validUser.lastName,
        mail: validUser.email,
      });
      expect(req.body.haslo).to.match(/^[a-f0-9]{64}$/);

      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: 'Rejestracja wykonana',
        },
      });
    }).as('registerRequest');

    cy.clock();
    registerScreenPage.register(
      validUser.email,
      validUser.firstName,
      validUser.lastName,
      validUser.password,
      validUser.password,
    );

    cy.wait('@registerRequest');
    registerScreenPage.getSuccessAlert().should('contain.text', 'Rejestracja pomyślna! Możesz się teraz zalogować.');

    cy.tick(900);
    cy.url().should('include', '/login');
  });

  it('shows API error message when registration fails', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      body: {
        success: false,
        message: 'Użytkownik z takim adresem email już istnieje',
      },
    }).as('registerFailRequest');

    registerScreenPage.register(
      validUser.email,
      validUser.firstName,
      validUser.lastName,
      validUser.password,
      validUser.password,
    );

    cy.wait('@registerFailRequest');
    registerScreenPage
      .getErrorAlert()
      .should('contain.text', 'Użytkownik z takim adresem email już istnieje');
  });

  it('navigates to login screen from action link', () => {
    registerScreenPage.getLoginButton().click();

    cy.url().should('include', '/login');
  });
});