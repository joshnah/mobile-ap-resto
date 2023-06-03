import { orders, products, restaurants } from '../mocks/mocks';

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
  cy.get('[data-testid=email]').type('email@gmail.com');
  cy.get('[data-testid=password]').type('32hj4g2');
  cy.get('[data-testid=connect-button]').click();
});
describe('Order page - user', () => {
  it('fetch orders', () => {
    cy.get('a[href="/Home/Commandes"]').should('be.visible').click();
  });
});
