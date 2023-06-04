describe('Create Account', () => {
  it('should display error messages for invalid inputs 1', () => {
    cy.visit('/');
    cy.wait(3000);
    cy.get('[data-testid=register-button]').click();

    cy.get('input[placeholder="Email"]').eq(0).type(emailInvalid, { force: true });
    cy.get('[data-testid=test-button]').click();
    cy.contains('Veuillez entrer une adresse mail valide');

  });
 
  
  it('should create a new account with valid inputs', () => {
    cy.visit('');
    cy.wait(3000);
    cy.get('[data-testid=register-button]').click();

    cy.get('input[placeholder="Email"]').eq(0).type('example@example.com', { force: true });
    cy.get('input[placeholder="Nom d\'utilisateur"]').eq(0).type('valid-username', { force: true });
    cy.get('input[placeholder="Mot de passe"]').eq(0).type('ValidPassword123', { force: true });
    cy.get('input[placeholder="Adresse"]').eq(0).type('123 Main Street', { force: true });
    cy.get('input[placeholder="Phone"]').eq(0).type('1234567890', { force: true });

    cy.get('[data-testid=test-button]').click();

    
  });
});
