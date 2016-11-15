const router = require('express').Router(),
      passport = require('passport');

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /twitter/callback
router.get('/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/twitter/callback', function (req, res, next) {
  passport.authenticate('twitter', function (err, user, info) {
    if (err) return next(err);

    req.login(user, function (err) {
      if (err) return next(err);
      return res.send('<script>window.close();</script>');
    });

  })(req, res, next);
});

// POST - log user in
router.post('/', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) return next(err);
    if (! user) return res.status(404).json({ 'message': info.message });

    req.login(user, function (err) {
      if (err) return next(err);

      return res.json({
        '_id': req.user._id,
        'email': req.user.email,
        'twitterId': req.user.twitterId
      });
    });
  })(req, res, next);
});

// GET user session
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.json({
      '_id': req.user._id,
      'email': req.user.email,
      'twitterId': req.user.twitterId
    });
  } else {
    res.status(401).json({ "error": "You are not authorized to see this information."});
  }
});

// DELETE user session (logout)
router.delete('/', function (req, res) {
  req.logout();
  res.status(205).end();
});

module.exports = router;
