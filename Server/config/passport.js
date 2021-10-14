const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../src/models/User");
const key = require("../src/utils/keys");

exports.applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = key.secretToken;
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, {
            email: user.email,
            exp: payload.exp,
            path: payload.path,
            id: payload.id,
          });
        }
        return done(null, false);
      });
    })
  );
};
