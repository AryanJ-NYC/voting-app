'use strict';
const router = require('express').Router(),
      Poll = require('../../models/poll/poll.model');

// POST - creates new poll
router.post('/', function (req, res) {
  console.log(req.user);

  let poll = new Poll({
    creatorId: req.user._id,
    title: req.body.title,
    options: req.body.options
  });

  poll.save(function (err) {
    if (err) return res.status(503).json({ 'message': err.message });
    res.json(poll);
  });
});

module.exports = router;
