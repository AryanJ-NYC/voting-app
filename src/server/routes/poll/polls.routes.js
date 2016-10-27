'use strict';
const router = require('express').Router(),
      Poll = require('../../models/poll/poll.model');


router.route('/')
// POST - creates new poll
.post(function (req, res) {
  if (req.isAuthenticated()) {
    let poll = new Poll({
      creatorId: req.user._id,
      title: req.body.title,
      options: req.body.options
    });

    poll.save(function (err) {
      if (err) return res.status(503).json({ 'message': err.message });
      res.json(poll);
    });
  } else {
    res.status(401).json({ 'message': 'Please log in to create a new poll. '});
  }
})
// GET all polls
.get(function (req, res) {
  Poll.find({}, function (err, polls) {
    if (err) return res.status(503).json({ 'message': err.message });
    res.json(polls);
  });
});

module.exports = router;
