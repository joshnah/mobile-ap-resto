import { orders, products, restaurants } from '../mocks/mocks';

const login = (isAdmin) => {
  cy.visit('/');
  cy.waitForReact(1000, '#root'); // On attend que React soit chargé
  cy.intercept('POST', '/login', {
    status: true,
    message: 'Login/Password ok',
    user: { name: 'test', id: 1, isAdmin, token: 'token' },
  });
  cy.intercept('GET', '/api/restaurants', restaurants);
  if (isAdmin) {
    cy.intercept('GET', '/api/orders', orders);
  } else {
    cy.intercept('GET', '/api/users/1/orders', orders);
  }
  cy.intercept('GET', '/api/products', products);

  // On renseigne email et password pour débloquer le bouton de connexion
  cy.get('[data-testid=email]').type('email@gmail.com');
  cy.get('[data-testid=password]').type('32hj4g2');
  cy.get('[data-testid=connect-button]').click();
};

describe('Order page ', () => {
  it('user - show details', () => {
    login(false);
    cy.get('a[href="/Home/Commandes"]').should('be.visible').click();
    cy.contains('Détails').click();
    cy.get('[data-testid=modal-detail-order]').should('be.visible');
  });
});

describe('Order page - admin ', () => {
  it('admin - modify order', () => {
    login(true);

    // intercept les nouvelles données de la commande
    cy.intercept('PUT', '/api/orders/1', {
      status: true,
    });

    const newOrders = JSON.parse(JSON.stringify(orders));
    const order1 = newOrders.data.find((o) => o.id === 1);
    order1.status = false;
    order1.address = 'new address';
    order1.phone = 'new phone';
    order1.products[0].quantity = 4;
    order1.products[1].quantity = 2;
    order1.products.splice(2, 1);

    cy.intercept('GET', '/api/orders', newOrders);

    // Modification de la commande
    cy.get('a[href="/Home/Commandes"]').should('be.visible').click();

    // Modal est visible
    cy.contains('Détails').click();
    cy.contains('Modifier').click();
    cy.get('[data-testid=detail-order-increment]').eq(0).click();
    cy.get('[data-testid=detail-order-increment]').eq(0).click();
    cy.get('[data-testid=detail-order-increment]').eq(1).click();
    cy.get('[data-testid=detail-order-decrement]').eq(0).click();
    cy.get('[data-testid=detail-order-delete]').eq(2).click();
    cy.get('[data-testid=detail-order-address]').clear().type('new address');
    cy.get('[data-testid=detail-order-phone]').clear().type('new phone');
    cy.contains('Toggle').click();

    // Quantité a changé
    cy.contains('33.95 €').should('be.visible');
    // count 2
    cy.get('[data-testid=detail-order-increment]').should('have.length', 2);

    cy.contains('Save').click();
  });
});
