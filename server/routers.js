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
const FriendsRouter = require('./modules/friends/router');

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

  return AuthService.getMe(token)
    .then((user) => {
      req.isAuthenticated = true;
      req.principal = user;
      next();
    })
    .catch(() => next());
});

/**
 * Routes
 */
app.use('/api', AuthRouter);
app.use('/api', FriendsRouter);
app.use(serveStatic(path.join(__dirname, './../dist')));

app.use((err, req, res, next) => {
  const isBoom = err.isBoom;
  console.error(err);
  res.status(isBoom ? err.output.statusCode : 500).json(isBoom ? err.output : Boom.wrap(err));
});

module.exports = app;
