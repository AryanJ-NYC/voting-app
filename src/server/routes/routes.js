'use strict';
const router = require('express').Router(),
      pollRoutes = require('./poll/polls.routes'),
      sessionRoutes = require('./session/sessions.routes'),
      userRoutes = require('./user/users.routes');

router.use('/polls', pollRoutes);
router.use('/sessions', sessionRoutes);
router.use('/users', userRoutes);    

module.exports = router;
