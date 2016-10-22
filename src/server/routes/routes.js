'use strict';
const router = require('express').Router(),
      sessionRoutes = require('./session/sessions.routes'),
      userRoutes = require('./user/users.routes');

router.use('/sessions', sessionRoutes);
router.use('/users', userRoutes);    

module.exports = router;
