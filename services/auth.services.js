var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require('../modules/users/user.model');

var localOpts = {
    usernameField: 'email'
}

const localstrategy = new LocalStrategy(localOpts, function(email, password, done){
    const user = User.findOne({email}, function(err, user){
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        else if(!user.authenticatePassword(password)){
            return done(null, false)
        }
        return done(null, user);
    });
})

passport.use(localstrategy);

module.exports = passport.authenticate('local', {session:false})

