const email = 'test@gmail.com';
const userName = 'test';
const password = 'test';
const newPassword = 'mdp1234';
const phone = '0605040302';
const address = 'Boulevard Maréchal Leclerc 38000 Grenoble';
const saveButton = 'Enregistrer les modifications';
const savePasswordButton = 'Modifier le mot de passe';

describe('NewOrderBasket', () => {
  it('new order', () => {
    // On accède à l'appli
    cy.visit('/');
    // On renseigne email et password pour débloquer le bouton de connexion
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=connect-button]').click();

    // On 
    cy.contains('€').click();
    cy.contains('Ajouter').click();

    // On se rend sur la page Panier
    cy.get('a[href="/Home/Panier"]').should('be.visible').click();
  });
});
