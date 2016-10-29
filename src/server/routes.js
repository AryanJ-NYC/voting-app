'use strict';
const router = require('express').Router(),
      pollRoutes = require('./polls/polls.routes'),
      sessionRoutes = require('./sessions/sessions.routes'),
      userRoutes = require('./users/users.routes');

router.use('/polls', pollRoutes);
router.use('/sessions', sessionRoutes);
router.use('/users', userRoutes);    

module.exports = router;
