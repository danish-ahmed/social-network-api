var Joi = require('joi');

module.exports = {
    createPost: {
        body: {
            title: Joi.string().min(3).required(),
            text: Joi.string().min(10).required(),
        }
    }
}