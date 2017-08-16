const _ = require('lodash');
const Boom = require('boom');
const Utils = require('../../utils/utils');
const Promise = require('bluebird');

const AuthService = {

  /**
   * @param {string} login
   * @param {string} password
   * @return {Promise.<{token: *, user: (*|{id, email, firstName, lastName})}>}
   */
  login: (login, password) => {
    if (_.isEmpty(login) || _.isEmpty(password)) {
      throw Boom.unauthorized();
    }
    const user = Utils.createUserWithLogin(login);
    return Promise.resolve({
      token: user.id,
      user: user,
    });
  },

  /**
   * @param {string} token
   * @return {Promise.<{id, email, firstName, lastName}>}
   */
  getMe: (token) => {
    if (_.isEmpty(token)) {
      throw Boom.unauthorized();
    }
    return Promise.resolve(Utils.createUser());
  },

  /**
   * @param {string} token
   * @return {Promise.<{id, email, firstName, lastName}>}
   */
  logout: (token) => {
    if (_.isEmpty(token)) {
      throw Boom.unauthorized();
    }
    return Promise.resolve({});
  },

};

module.exports = AuthService;
