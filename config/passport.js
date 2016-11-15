'use strict';
const LocalStrategy = require('passport-local').Strategy,
      TwitterStrategy = require('passport-twitter').Strategy,
      User = require('../src/server/users/user.model');

module.exports = function (passport) {
  // session setup - required for persistent login sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    process.nextTick(function () {
      // find user that is same as form email to see if already exists
      User.findOne({'email': email}, function (err, user) {
        if (err) return done(err, false);
        if (user) return done(null, false, { message: 'Email address already registered.' });

        // if user is not found, createPoll new user
        let newUser = new User({
          email: email,
          password: password
        });
        newUser.save(function (err) {
          if (err) {
            let errMessage = err.errors.email.message || err.errors.password.message || err.message;
            return done(null, false, { message: errMessage });
          }
          return done(null, newUser);
        });
      });
    });
  }));
  
  // local login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    // find user
    User.findOne({'email': email}, function (err, user) {
      if (err) return done(err);
      if (! user) return done(null, false, { 'message': 'Account does not exist.'});

      if (!user.validPassword(password)) return done(null, false, { 'message': 'Incorrect password.'});
      return done(null, user);
    });
  }));

  // Twitter authentication
  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: '/api/sessions/twitter/callback'
    },
    function (token, tokenSecret, profile, done) {
      User.findOne({ 'twitterId': profile.id }, function (err, user) {
        if (err) return done(err, false);
        if (user) return done(null, user);

        let newUser = new User({
          twitterId: profile.id
        });
        newUser.save(function (err) {
          if (err) {
            let errMessage = err.errors.email.message || err.errors.password.message || err.message;
            return done(null, false, { message: errMessage });
          }

          return done(null, newUser);
        });
      });
    }));
};
