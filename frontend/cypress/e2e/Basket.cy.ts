import { orders, products, restaurants } from '../mocks/mocks';

const email = 'test@gmail.com';
const userName = 'test';
const password = 'test';
const newPassword = 'mdp1234';
const phone = '0605040302';
const address = 'Boulevard Maréchal Leclerc 38000 Grenoble';
const saveButton = 'Enregistrer les modifications';
const savePasswordButton = 'Modifier le mot de passe';

beforeEach(() => {
  cy.visit('/');
  cy.waitForReact(1000, '#root'); // On attend que React soit chargé
  cy.intercept('POST', '/login', {
    status: true,
    message: 'Login/Password ok',
    user: { name: 'test', id: 1 },
  });
  cy.intercept('GET', '/api/restaurants', restaurants);
  cy.intercept('GET', '/api/users/1/orders', orders);
  cy.intercept('GET', '/api/products', products);

  // On renseigne email et password pour débloquer le bouton de connexion
  cy.get('[data-testid=email]').type(email);
  cy.get('[data-testid=password]').type(password);
  cy.get('[data-testid=connect-button]').click();
});
describe('Order', () => {
  it('new order', () => {
    // On
    cy.contains('€').click();
    cy.contains('Ajouter').click();

    // On se rend sur la page Panier
    cy.get('a[href="/Home/Panier"]').should('be.visible').click();
  });

  it('Add product to basket, modify and remove quantity', () => {
    cy.contains('Cheeseburger').click();
    cy.get('[data-testid=increment]').click();
    cy.get('[data-testid=increment]').click();
    cy.get('[data-testid=increment]').click();
    cy.get('[data-testid=decrement]').click();
    // verifier quantite
    cy.get('[data-testid=quantity]').should(($div) => {
      expect($div).to.have.text('3');
    });

    cy.contains('Ajouter').click();

    // On se rend sur la page Panier
    cy.get('a[href="/Home/Panier"]').should('be.visible').click();
    cy.contains('Commander').should(($div) => {
      expect($div).to.have.text('Commander 29.97 €');
    });

    cy.get('[data-testid=basket-increment]').click();
    cy.get('[data-testid=basket-increment]').click();
    cy.get('[data-testid=basket-increment]').click();
    cy.get('[data-testid=basket-decrement]').click();
    cy.get('[data-testid=basket-quantity]').should(($div) => {
      expect($div).to.have.text('5');
    });

    cy.get('[data-testid=basket-remove]').click();
    cy.contains('Votre panier est vide.');
  });
});
