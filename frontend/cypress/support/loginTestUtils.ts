export type LoginRole = 'admin' | 'client' | 'manager' | 'mechanic';

export type LoginUser = {
  role: LoginRole;
  fixture: 'admin-user' | 'client-user' | 'manager-user' | 'mechanic-user';
};

export type FixtureUser = {
  email: string;
  password: string;
};

export const LOGIN_USERS: LoginUser[] = [
  { role: 'admin', fixture: 'admin-user' },
  { role: 'client', fixture: 'client-user' },
  { role: 'manager', fixture: 'manager-user' },
  { role: 'mechanic', fixture: 'mechanic-user' },
];

export const getFixtureUser = (fixtureName: LoginUser['fixture']) => {
  return cy.fixture<FixtureUser>(fixtureName).then((user) => {
    expect(user.email, `Missing fixture email in ${fixtureName}`).to.be.a('string').and.not.be.empty;
    expect(user.password, `Missing fixture password in ${fixtureName}`).to.be.a('string').and.not.be.empty;
    return user;
  });
};

export const stubSuccessfulLogin = (role: LoginRole, email: string) => {
  cy.intercept('POST', '**/api/auth/login', (req) => {
    expect(req.body).to.have.property('mail', email);
    expect(req.body).to.have.property('haslo');
    expect(req.body.haslo).to.match(/^[a-f0-9]{64}$/);

    req.reply({
      statusCode: 200,
      body: {
        success: true,
        message: 'OK',
        data: {
          token: `fake-jwt-token-${role}`,
          user: {
            id: 1,
            imie: 'Test',
            nazwisko: 'User',
            mail: email,
            rola: role,
          },
        },
      },
    });
  }).as('loginRequest');

  cy.intercept('GET', '**/api/profile', {
    statusCode: 200,
    body: {
      success: true,
      data: {
        id: 1,
        imie: 'Test',
        nazwisko: 'User',
        mail: email,
        telefon: '123456789',
        rola: role,
      },
    },
  }).as('profileRequest');
};