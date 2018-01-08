var userRouter = require('./users/user.routes');
var posrRouter = require('./posts/post.routers');

module.exports = (app) => {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/posts', posrRouter);
}