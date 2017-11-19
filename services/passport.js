const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//encodes user's profile id inside db id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//decodes user's profile id inside db id
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }) //creates a new model instances
            //if you don't chain .then and call done, system may end before user is saved in db (asynch)
            .save()
            //always return the user returned by callback rather than above User because it may contain more info
            .then(user => done(null, user));
        }
      });
    }
  )
);
