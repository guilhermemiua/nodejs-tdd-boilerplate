const routes = require('express').Router();
const AuthController = require('../app/controllers/AuthController');

routes.post('/authenticate', AuthController.store);

module.exports = routes;
