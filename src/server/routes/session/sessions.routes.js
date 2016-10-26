const router = require('express').Router(),
      passport = require('passport');

// POST - log user in
router.post('/', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) return next(err);
    if (! user) return res.status(404).json({ 'message': info.message });

    req.login(user, function (err) {
      if (err) return next(err);

      return res.json({
        '_id': req.user._id,
        'email': req.user.email
      });
    });
  })(req, res, next);
});

// GET user session
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.json({
      "_id": req.user._id,
      "email": req.user.email,
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
