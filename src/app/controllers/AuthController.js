const { User } = require('../models');

class AuthController {
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      // User not found
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Incorrect password
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      return res.status(200).json({ user, token: user.generateToken() });
    } catch (error) {
      return res.status(401).json({ message: error });
    }
  }
}

module.exports = new AuthController();
