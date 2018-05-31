const Boom = require('boom');

// TODO: add support for roles
const isAuthenticated = (req, res, next) => {
  const { isAuthenticated: isAuth } = req;
  if (!isAuth) {
    throw Boom.unauthorized();
  }
  next();
};

module.exports = isAuthenticated;
