const Boom = require('boom');

const isAuthenticated = (req, res, next) => {
  const { isAuthenticated: isAuth } = req;
  if (!isAuth) {
    throw Boom.unauthorized();
  }
  next();
};

module.exports = isAuthenticated;
