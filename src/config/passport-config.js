// handles authentication using passport
const passport = require("passport");
const StravaStrategy = require("passport-strava").Strategy;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

    // init passport, uses sessions to keep track of auth users
    app.use(passport.initialize());
    app.use(passport.session());



    // uses 'strava' auth strategy, once authorized adds association to our unique User model
    passport.use(new StravaStrategy({
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: "/return"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ stravaId: profile.id }, function(err, user) {
          return cb(err, user);
        });
      }
    ));

    // stores authenticated user.id and stores in session
    passport.serializeUser((user, callback) => {
      callback(null, user);
    });

    // takes the user.id stored in the session and returns user associated with it
    passport.deserializeUser((object, callback) => {
      callback(null, object);

    });
  }
}
