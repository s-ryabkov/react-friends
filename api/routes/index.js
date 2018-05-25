// const passport = require('passport');
const AuthRoutes = require('./AuthRoutes');
const FriendsRoutes = require('./FriendsRoutes');
const AuthService = require('./../services/AuthService');
const Boom = require('boom');
const _ = require('lodash');

/**
 * Register routes in the system
 */
module.exports = (app) => {

  // Init auth
  // app.use(passport.initialize());

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

  // apply all the routes
  app.use('/api', AuthRoutes);
  app.use('/api', FriendsRoutes);

  // the express error handler
  app.use((err, req, res, next) => {
    // here we can have custom handlers for different type of errors if needed
    const isBoom = err.isBoom;
    const statusCode = isBoom ? err.output.statusCode : 500;
    if (statusCode === 500) {
      console.error(err);
    }
    const error = isBoom ? err : Boom.wrap(err);
    res.status(statusCode).json({ ...(error.output), errors: err.data });
  });

  return app;
};
