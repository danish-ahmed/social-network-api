var express = require('express')
var Router = express.Router();
var userController = require('./user.controller');
var validate = require('express-validation')
var userValidation = require('./user.validation')

var validate = require('express-validation')
var userValidation = require('./user.validation')

Router.get('/', (req, res) => {console.log('rrrrr')});

Router.post('/signup', validate(userValidation.signup), userController.signup);

module.exports = Router
