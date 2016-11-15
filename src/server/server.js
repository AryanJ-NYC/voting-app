'use strict';
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      passport = require('passport'),
      path = require('path'),
      portNumber = process.env.PORT || process.argv[2] || 8080,
      session = require('express-session');

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
  app.use(morgan('dev', { skip: function (req, res) { return res.statusCode < 400 } }));
} else {
  app.use(morgan('combined'));
}

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, function () {
  console.log('Connected to database.');
});

// required for passport
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// pass passport for configuration
require('../../config/passport')(passport);

// basic setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views settings
app.use(express.static(path.join(`${__dirname}/../../`)));

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: { message: err.message }});
});

// routes
let routes = require('./routes');
app.use('/api', routes);
app.get(['/', '/polls', '/polls/:id', '/my-polls'], function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(portNumber, function () {
  console.log(`Listening on port ${portNumber}`);
});
