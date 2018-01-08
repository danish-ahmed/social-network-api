var Post = require('./post.model');
module.exports = {
    createPost: (req, res) => {
        Post.createPost(req.body, req.user._conditions._id)
            .then(post => res.status(201).json(post))
            .catch(err => res.status(500).json(err))
            
    }
}