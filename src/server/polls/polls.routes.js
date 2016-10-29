'use strict';
const router = require('express').Router(),
      Poll = require('./poll.model'),
      pollHandlers = require('./polls.handlers');

router.param('pollId', function (req, res, next, id) {
  Poll.findOne({'_id': id}, function (err, poll) {
    if (err) return res.status(503).json({ 'message': err.message });
    req.poll = poll;
    return next();
  })
});

router.param('optionId', function (req, res, next, id) {
  req.option = req.poll.options.id(id);
  if (! req.option) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
  next();
});

router.route('/')
// POST - creates new poll
.post(pollHandlers.createPoll)

// GET all polls
.get(pollHandlers.getAll);

router.route('/:pollId')
// GET post with matching database ID
.get(pollHandlers.getById);

router.route('/:pollId/options/:optionId/vote')
// POST a vote to the poll option
.post(pollHandlers.addVote);

module.exports = router;
