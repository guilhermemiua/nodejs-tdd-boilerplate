const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
    },
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};
