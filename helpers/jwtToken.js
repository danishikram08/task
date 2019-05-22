const {secret} = require('../bin/env');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {};
const jwt = require('jsonwebtoken');
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(jwtOptions, (user, done) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }));
    function jwtToken(string) {
        const token = jwt.sign(string, jwtOptions.secretOrKey);
        return token;
    }
}