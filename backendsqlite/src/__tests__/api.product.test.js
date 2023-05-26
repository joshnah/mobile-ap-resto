const app = require('../app');
const request = require('supertest');
beforeAll(async () => {
  await require('../util/initdb').initDb();
});
describe('PRODUCT TEST', () => {
  // admin@gmail.com
  let TOKEN_ADMIN = '';
  let TOKEN_USER = '';
  test('Login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', password: 'admin' });
    expect(response.statusCode).toBe(200);
    TOKEN_ADMIN = response.body.user.token;

    const response2 = await request(app)
      .post('/login')
      .send({ email: 'test@gmail.com', password: 'test' });
    expect(response2.statusCode).toBe(200);
    TOKEN_USER = response2.body.user.token;
  });

  test('Get all products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(3);
  });

  test('Create product', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('x-access-token', TOKEN_ADMIN)
      .send({
        name: 'New burger',
        type: 'burger',
        price: '10.95',
        description: 'New burger',
      });
    expect(response.statusCode).toBe(200);
  });

  test('Update product name', async () => {
    const response = await request(app)
      .put('/api/products/2')
      .set('x-access-token', TOKEN_ADMIN)
      .send({ name: 'new name' });
    expect(response.statusCode).toBe(200);
  });

  test('Update product price', async () => {
    const response = await request(app)
      .put('/api/products/2')
      .set('x-access-token', TOKEN_ADMIN)
      .send({ price: '5.5' });
    expect(response.statusCode).toBe(200);
  });

  test('Update product description', async () => {
    const response = await request(app)
      .put('/api/products/2')
      .set('x-access-token', TOKEN_ADMIN)
      .send({ description: 'new description' });
    expect(response.statusCode).toBe(200);
  });

  test('Modify product without being an admin', async () => {
    const response = await request(app)
      .put('/api/products/2')
      .set('x-access-token', TOKEN_USER)
      .send({ name: 'new name' });
    expect(response.statusCode).toBe(401);
  });

  test('Delete product', async () => {
    const response = await request(app)
      .delete('/api/products/2')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
  });

  test('Delete product without being an admin', async () => {
    const response = await request(app)
      .delete('/api/products/1')
      .set('x-access-token', TOKEN_USER);
    expect(response.statusCode).toBe(401);
  });
});
