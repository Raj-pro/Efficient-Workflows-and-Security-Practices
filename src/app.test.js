const request = require('supertest');
const app = require('./app');

describe('API Endpoints', () => {
  test('GET / returns status ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /health returns healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /user/:id with valid id returns user', async () => {
    const res = await request(app).get('/user/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('GET /user/:id with invalid id returns 400', async () => {
    const res = await request(app).get('/user/abc');
    expect(res.statusCode).toBe(400);
  });
});
