describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/');
    cy.intercept('POST', '/login', {
      status: true,
      message: 'Login/Password ok',
      user: { name: 'test' },
    });
    cy.get('[data-testid=email]').type('test@gmail.com');
    cy.get('[data-testid=password]').type('123123456');
    cy.get('[data-testid=connect-button]').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('auth')
      .should('deep.equal', {
        isLoggedIn: true,
        user: { name: 'test' },
        hasChanged: false,
        pwdChanged: false,
        registered: false,
      });
  });

  it('should login rejected', () => {
    cy.visit('/');
    cy.intercept('POST', '/login', {
      status: false,
    });
    cy.get('[data-testid=email]').type('test@gmail.com');
    cy.get('[data-testid=password]').type('123123456');
    cy.get('[data-testid=connect-button]').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('auth')
      .should('deep.equal', {
        isLoggedIn: false,
        user: null,
        hasChanged: false,
        pwdChanged: false,
        registered: false,
      });
  });
});
