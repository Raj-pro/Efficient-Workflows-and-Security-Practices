const request = require('supertest');
const server = require('./server');

afterAll(() => server.close());

describe('GET /', () => {
  it('returns 200 with deployment message', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Deployment Successful');
  });
});

describe('GET /health', () => {
  it('returns healthy status', async () => {
    const res = await request(server).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Healthy');
  });
});
