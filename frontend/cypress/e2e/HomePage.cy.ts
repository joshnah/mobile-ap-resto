import { orders, products, restaurants } from 'cypress/mocks/mocks';

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
  // On a deja un test pour ajouter un produit au panier dans Basket.cy.ts
  it('admin - Modify', () => {
    login(true);

    // intercept la requete PUT
    cy.intercept('PUT', '/api/products/1', {
      status: true,
    });

    // intercept les nouvelles données
    const newProducts = JSON.parse(JSON.stringify(products));
    const product1 = newProducts.data.find((o) => o.id === 1);
    product1.name = 'New name';
    product1.description = 'New description';
    cy.intercept('GET', '/api/products', newProducts);

    cy.contains('Cheeseburger').click();
    cy.contains('Modifier').click();

    // On modifie les données
    cy.get('[data-testid=product-desc]').clear().type('New description');
    cy.get('[data-testid=product-price]').clear().type('10');
    cy.get('[data-testid=product-url]').clear().type('https://www.image.com');
    cy.get('[data-testid=product-name]').clear().type('New name');

    // On valide
    cy.get('[data-testid=product-save]').click();

    cy.contains('New name');
    cy.contains('New description');
    cy.contains('10');
  });

  it('admin - Delete', () => {
    login(true);

    // intercept les nouvelles données
    cy.intercept('DELETE', '/api/products/?', {
      status: true,
    });

    // intercept les nouvelles données
    const newProducts = JSON.parse(JSON.stringify(products));
    const index = newProducts.data.findIndex((o) => o.name === 'Cheeseburger');
    newProducts.data.splice(index, 1);

    cy.intercept('GET', '/api/products', newProducts);

    // On supprime le produit
    cy.contains('Cheeseburger').click();
    cy.contains('Supprimer').click();
  });

  it('admin - Add un produit', () => {
    login(true);

    // intercept l'ajout d'un produit
    cy.intercept('POST', '/api/products/', {
      status: true,
    });

    // intercept les nouvelles données
    const newProducts = JSON.parse(JSON.stringify(products));
    newProducts.data.push({
      id: newProducts.data.length + 1,
      name: 'New product',
      description: 'New description',
      price: 10,
      image: 'https://www.image.com',
      type: 'burger',
    });
    cy.intercept('GET', '/api/products', newProducts);

    // On ajoute un produit
    cy.contains('Ajouter un produit').click();
    cy.get('[data-testid=new-product-name]').type('New product');
    cy.get('[data-testid=new-product-desc]').type('New description');
    cy.get('[data-testid=new-product-price]').type('10');
    cy.get('[data-testid=new-product-image]').type('https://www.image.com');

    // On valide
    cy.get('[data-testid=new-product-save]').click();
    cy.contains('New product');
    cy.contains('New description');
  });
});
