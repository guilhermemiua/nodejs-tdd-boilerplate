const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/auth');

routes.post('/register', UserController.register);
routes.post('/authenticate', UserController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/auth-test', (req, res) => {
  return res.status(200).json();
});

module.exports = routes;
