/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factory');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/authenticate')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '12345',
    });

    const response = await request(app)
      .post('/authenticate')
      .send({
        email: user.email,
        password: '1234',
      });

    expect(response.status).toBe(401);
  });

  it('should not authenticate when user is not found', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({
        email: 'emailNotFound@gmail.com',
        password: '1234',
      });

    expect(response.status).toBe(401);
  });

  it('should return a jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app)
      .post('/authenticate')
      .send({
        email: user.email,
        password: '12345678',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app)
      .get('/auth-test')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app)
      .get('/auth-test');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/auth-test')
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });
});
