var express = require('express')
var Router = express.Router();
var authJwt = require('../../services/auth.services').authJwt
var postController = require('./post.controller')
var postValidate = require('./post.validation')
var validate = require('express-validation')

Router.post('/', authJwt, validate(postValidate.createPost), postController.createPost);

module.exports = Router;