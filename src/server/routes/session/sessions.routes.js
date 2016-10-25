const router = require('express').Router(),
      passport = require('passport');

// POST - log user in
router.post('/', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(404).json({ 'message': info.message });

    req.login(user, function (err) {
      if (err) return next(err);

      res.json({
        '_id': req.user._id,
        'email': req.user.email
      });
    })
  })(req, res, next);
});

module.exports = router;
