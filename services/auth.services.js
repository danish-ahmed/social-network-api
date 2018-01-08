var passport = require('passport');
var LocalStrategy = require('passport-local');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var constants = require('../config/constants')

var User = require('../modules/users/user.model');

// LOCAL STRATEGY
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

// JWT STRATEGY
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: constants.JWT_SECRET
};

const JwtStrategy = new JWTStrategy(jwtOpts, function(payload, done){
    const user = User.findById(payload._id);
    if(!user){ return done(null, false) };
    if(user){ return done(null, user) }
    return done(err, false)
})

passport.use(localstrategy);
passport.use(JwtStrategy)

module.exports = {
    authLocal: passport.authenticate('local', {session: false}),
    authJwt: passport.authenticate('jwt', {session: false})
}