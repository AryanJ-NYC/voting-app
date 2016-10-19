'use strict';
const router = require('express').Router(),
      userRoutes = require('./user/user.routes');

router.use('/users', userRoutes);    

module.exports = router;
