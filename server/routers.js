const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const serveStatic = require('serve-static');

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(morgan('combined'));

/**
 * Routes
 */
app.use(serveStatic(path.join(__dirname, './../dist')));

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send('Error handling TBD');
});

module.exports = app;
