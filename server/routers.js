const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const Boom = require('boom');
const _ = require('lodash');
const app = express();
const serveStatic = require('serve-static');

const AuthRouter = require('./modules/auth/router');
const AuthService = require('./modules/auth/service');

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));
// check whether user is authenticated and add use data into request
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (_.isEmpty(token)) {
    return next();
  }

  AuthService.getMe(token)
    .then((user) => {
      req.isAuthenticated = true;
      req.principal = user;
      next();
    })
    .catch((err) => next());
});

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
