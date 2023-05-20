const app = require('../app');
const request = require('supertest');
beforeAll(async () => {
  await require('../util/initdb').initDb();
});
describe('USER TEST', () => {
  let TOKEN_ADMIN = '';
  let TOKEN_NEWUSER = '';
  test('Login admin', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', password: 'admin' });
    expect(response.statusCode).toBe(200);
    TOKEN_ADMIN = response.body.user.token;
  });

  test('Wrong password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', password: 'abcde' });
    expect(response.statusCode).toBe(403);
  });

  test('Missing token', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(403);
  });

  test('Get all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(3);
  });

  test('Create user', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'newuser@gmail.com',
      password: '12312A',
      name: 'newuser',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Login successful', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'newuser@gmail.com', password: '12312A' });
    TOKEN_NEWUSER = response.body.user.token;
    expect(response.statusCode).toBe(200);
  });

  test('Get user by email', async () => {
    const response = await request(app)
      .get('/api/users/test@gmail.com')
      .set('x-access-token', TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
  });

  test('Update user name', async () => {
    const response = await request(app)
      .put('/api/users')
      .set('x-access-token', TOKEN_NEWUSER)
      .send({ name: 'new name' });
    expect(response.statusCode).toBe(200);
  });

  test('Update user password', async () => {
    const response = await request(app)
      .put('/api/users')
      .set('x-access-token', TOKEN_NEWUSER)
      .send({ password: '12312A' });
    expect(response.statusCode).toBe(200);
  });

  test('Delete user', async () => {
    const response = await request(app)
      .delete('/api/users')
      .set('x-access-token', TOKEN_NEWUSER);
    expect(response.statusCode).toBe(200);
  });
});
