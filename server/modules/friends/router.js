const express = require('express');
const _ = require('lodash');
const Boom = require('boom');
const FriendsRouter = express.Router();
const FriendsService = require('./service');

FriendsRouter
  .use((req, res, next) => {
    const {isAuthenticated} = req;
    if (!isAuthenticated) {
      throw Boom.unauthorized();
    }
    next();
  })
  .get('/friends/:id', (req, res, next) => {
    const {id} = req.params;
    FriendsService.getOne(id)
      .then((friend) => {
        if (_.isEmpty(friend)) {
          throw Boom.notFound(`Friend not found, id = [${id}]`);
        }

        res.json(friend)
      })
      .catch(next);
  })
  .get('/friends', (req, res, next) => {
    const {from, number, query} = req.query;
    const options = {
      from: ~~from || 0,
      number: ~~number || 10,
      query: query || '',
    };
    FriendsService.search(options)
      .then((searchResult) => res.json(searchResult))
      .catch(next);
  });

module.exports = FriendsRouter;
