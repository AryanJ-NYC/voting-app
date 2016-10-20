const router = require('express').Router(),
      passport = require('passport');

router.post('/', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) return next(err);
    if (! user) return res.status(409).json({ 'message': 'Email address already registered' });
    
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.json({
        "_id": user._id,
        "email": user.email,
        "group": user.group
      });
    });
  })(req, res, next);
});

module.exports = router;
