/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

const { User } = require('../../src/app/models');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      email: 'guilhermemiua@gmail.com',
      password: '47225589',
    });

    const response = await request(app)
      .post('/authenticate')
      .send({
        email: user.email,
        password: '47225589',
      });

    expect(response.status).toBe(200);
  });
});
