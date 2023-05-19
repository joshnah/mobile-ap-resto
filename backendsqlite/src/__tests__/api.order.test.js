const app = require('../app');
const request = require('supertest');
describe('ORDER TEST', () => {
  let TOKEN_ADMIN = '';
  let TOKEN_NEWUSER = '';
  test('Login admin', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', password: 'admin' });
    expect(response.statusCode).toBe(200);
    TOKEN_ADMIN = response.body.user.token;
  });

  test('Login successful', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@gmail.com', password: 'test' });
    TOKEN_NEWUSER = response.body.user.token;
    expect(response.statusCode).toBe(200);
  });

  test('Get all orders by admin', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(2);
  });

  test('Get all orders by user', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('x-access-token', TOKEN_NEWUSER);
    expect(response.statusCode).toBe(401);
  });

  test('Get order by id with admin account', async () => {
    const response = await request(app)
      .get('/api/orders/1')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  test('Get order by id with unauthorized user account', async () => {
    const response = await request(app)
      .get('/api/orders/1')
      .set('x-access-token', TOKEN_NEWUSER);
    expect(response.statusCode).toBe(401);
  });

  test("Create order with user account", async () => {
    const response = await request(app)
      .post("/api/orders")
      .set("x-access-token", TOKEN_NEWUSER)
      .send({
        address: "My Address",
        products: [
          { productId: 1, quantity: 3 },
          { productId: 2, quantity: 5 },
        ],
        restaurantId: 1
      });
    expect(response.statusCode).toBe(200);
  });

  test('Get order by id with user account', async () => {
    const response = await request(app)
      .get('/api/orders/3')
      .set('x-access-token', TOKEN_NEWUSER);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  test('Update order status, address and products with admin account', async () => {
    const response = await request(app)
      .put('/api/orders/1')
      .set('x-access-token', TOKEN_ADMIN)
      .send({
        status: true,
        address: 'New Address',
        products: [{ productId: 2, quantity: 10 }],
      });
    expect(response.statusCode).toBe(200);
  });

  test('Update order status with user account', async () => {
    const response = await request(app)
      .put('/api/orders/3')
      .set('x-access-token', TOKEN_NEWUSER)
      .send({
        status: false,
      });
    expect(response.statusCode).toBe(200);
  });

  test('Update order status with unauthorized user account', async () => {
    const response = await request(app)
      .put('/api/orders/1')
      .set('x-access-token', TOKEN_NEWUSER)
      .send({
        status: true,
      });
    expect(response.statusCode).toBe(401);
  });

  test('Delete order with admin account', async () => {
    const response = await request(app)
      .delete('/api/orders/3')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
  });

  test('Delete order with unauthorized user account', async () => {
    const response = await request(app)
      .delete('/api/orders/1')
      .set('x-access-token', TOKEN_NEWUSER);
    expect(response.statusCode).toBe(401);
  });
});
