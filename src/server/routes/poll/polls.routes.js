'use strict';
const router = require('express').Router(),
      Poll = require('../../models/poll/poll.model');

// POST - creates new poll
router.post('/', function (req, res) {
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
});

module.exports = router;
