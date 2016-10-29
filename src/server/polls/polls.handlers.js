'use strict';
const Poll = require('./poll.model');

module.exports.createPoll = function (req, res) {
  // only authenticated users can createPoll new polls
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
    res.status(401).json({ 'message': 'Please log in to createPoll a new poll. '});
  }
};

module.exports.getAll = function (req, res) {
  Poll.find({}, function (err, polls) {
    if (err) return res.status(503).json({ 'message': err.message });
    res.json(polls);
  });
};

module.exports.getById = function (req, res) {
  Poll.findOne({'_id': req.params.id}, function (err, poll) {
    if (err) return res.status(503).json({ 'message': err.message });
    res.json(poll);
  })
};
