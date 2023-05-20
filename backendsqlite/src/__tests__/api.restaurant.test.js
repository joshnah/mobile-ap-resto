const app = require('../app');
const request = require('supertest');
beforeAll(async () => {
  await require('../util/initdb').initDb();
});
describe('RESTAURANT TEST', () => {
  let TOKEN_ADMIN = '';
  let TOKEN_USER = '';
  test('Login admin and user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', password: 'admin' });
    expect(response.statusCode).toBe(200);
    TOKEN_ADMIN = response.body.user.token;
    const response2 = await request(app).post('/login').send({
      email: 'test@gmail.com',
      password: 'test',
    });

    TOKEN_USER = response2.body.user.token;
  });

  test('Get all restaurants', async () => {
    const response = await request(app)
      .get('/api/restaurants')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(2);
    const response1 = await request(app)
      .get('/api/restaurants')
      .set('x-access-token', TOKEN_USER);
    expect(response1.statusCode).toBe(200);
    expect(response1.body.data.length).toBe(2);
  });

  test('Create restaurant', async () => {
    const response = await request(app)
      .post('/api/restaurants')
      .set('x-access-token', TOKEN_ADMIN)
      .send({
        name: 'new restaurant',
        address: 'new address',
        phone: '123456789',
      });

    expect(response.statusCode).toBe(200);

    const response1 = await request(app)
      .post('/api/restaurants')
      .set('x-access-token', TOKEN_USER)
      .send({
        name: 'new restaurant',
        address: 'new address',
        phone: '123456789',
      });
    expect(response1.statusCode).toBe(401);
  });

  test('Update restaurant', async () => {
    const response = await request(app)
      .put('/api/restaurants/1')
      .set('x-access-token', TOKEN_ADMIN)
      .send({
        name: 'new restaurant 1',
        address: 'new address 1',
        phone: '99999999',
      });

    expect(response.statusCode).toBe(200);

    const response1 = await request(app)
      .put('/api/restaurants/1')
      .set('x-access-token', TOKEN_USER)
      .send({
        name: 'new restaurant 1',
        address: 'new address 1',
        phone: '9999999',
      });
    expect(response1.statusCode).toBe(401);
  });

  test('Delete restaurant', async () => {
    const response = await request(app)
      .delete('/api/restaurants/1')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);

    const response1 = await request(app)
      .delete('/api/restaurants/1')
      .set('x-access-token', TOKEN_USER);
    expect(response1.statusCode).toBe(401);
  });
});
