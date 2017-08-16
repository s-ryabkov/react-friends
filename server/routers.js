const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const Boom = require('boom');
const app = express();
const serveStatic = require('serve-static');

const AuthRouter = require('./modules/auth/router');

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));

/**
 * Routes
 */
app.use('/api', AuthRouter);
app.use(serveStatic(path.join(__dirname, './../dist')));

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.isBoom ? err.output.statusCode : 500).json(err.isBoom ? err.output : Boom.wrap(err));
});

module.exports = app;
