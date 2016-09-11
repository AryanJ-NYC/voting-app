'use strict';
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      path = require('path'),
      portNumber = process.env.PORT || process.argv[2] || 8080;

// basic setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// views settings
app.use(express.static(__dirname));

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: { message: err.message }});
});

// routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(portNumber, function () {
  console.log(`Listening on port ${portNumber}`);
});
