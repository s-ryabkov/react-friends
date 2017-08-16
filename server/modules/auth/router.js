const express = require('express');
const AuthRouter = express.Router();
const AuthService = require('./service');
const isAuthenticated = require('./../../middleware/isAuthenticated');

AuthRouter
  .post('/login', (req, res, next) => {
    const {login, password} = req.body;
    AuthService.login(login, password)
      .then((data) => {
        res.cookie('token', data.token, {maxAge: 1000 * 60 * 10, httpOnly: false});
        res.json(data);
      })
      .catch(next);
  });

AuthRouter
  .use(isAuthenticated)
  .get('/session', (req, res, next) => {
    const {token} = req.cookies;
    AuthService.getMe(token)
      .then((data) => res.json(data))
      .catch(next);
  })
  .post('/logout', (req, res, next) => {
    const {token} = req.cookies;
    AuthService.logout(token)
      .then((data) => {
        res.cookie('token', '', {maxAge: 0, httpOnly: false});
        res.json(data);
      })
      .catch(next);
  });

module.exports = AuthRouter;
