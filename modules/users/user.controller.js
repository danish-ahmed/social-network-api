var User = require('./user.model');
module.exports = {
    signup: (req, res) => {
        User.create(req.body)
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json(err))
    },

    login: (req, res, next) => {
        res.status(200).json(req.user);
        return next()
    }

}