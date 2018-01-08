var express = require('express')
var Router = express.Router();
var userController = require('./user.controller');
var validate = require('express-validation')
var userValidation = require('./user.validation')
var authLocal = require('../../services/auth.services').authLocal;

var validate = require('express-validation')
var userValidation = require('./user.validation')

Router.get('/', (req, res) => {console.log('rrrrr')});

Router.post('/signup', validate(userValidation.signup), userController.signup);

Router.post('/login', authLocal, userController.login)

module.exports = Router
