'use strict';
const router = require('express').Router(),
      Poll = require('./poll.model'),
      pollHandlers = require('./polls.handlers');


router.route('/')
// POST - creates new poll
.post(pollHandlers.createPoll)

// GET all polls
.get(pollHandlers.getAll);

router.route('/:id')
// GET post with matching database ID
.get(pollHandlers.getById);

module.exports = router;
