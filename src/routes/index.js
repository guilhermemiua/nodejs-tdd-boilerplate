const routes = require('express').Router();

const AuthController = require('../app/controllers/AuthController');
const authMiddleware = require('../app/middlewares/auth');

routes.post('/authenticate', AuthController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/auth-test', (req, res) => {
  return res.status(200).json();
});

module.exports = routes;
