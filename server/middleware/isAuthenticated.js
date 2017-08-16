const Boom = require('boom');

const isAuthenticated = (req, res, next) => {
  const {isAuthenticated} = req;
  if (!isAuthenticated) {
    throw Boom.unauthorized();
  }
  next();
};

module.exports = isAuthenticated;
