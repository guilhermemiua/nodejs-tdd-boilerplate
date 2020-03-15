/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');

const factory = require('../factory');
const truncate = require('../utils/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    expect(await bcrypt.compare('123123', user.password)).toBe(true);
  });
});
