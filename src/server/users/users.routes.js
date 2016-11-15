const router = require('express').Router(),
      passport = require('passport'),
      Poll = require('../polls/poll.model');

// POST - creates new user
router.post('/', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) return next(err);
    if (! user) return res.status(409).json({ 'message': info.message });

    req.login(user, function (err) {
      if (err) return next(err);

      return res.json({
        '_id': req.user._id,
        'email': req.user.email
      });
    });
  })(req, res, next);
});

// GET user polls
router.get('/:userId/polls', function (req, res, next) {
  Poll.find({ 'creatorId': req.params.userId }, function (err, polls) {
    if (err) return res.status(err.statusCode).json({'message': err.message});
    res.json(polls);
  });
});

module.exports = router;
