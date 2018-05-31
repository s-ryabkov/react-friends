const { Router: FriendsRoutes } = require('express');
const _ = require('lodash');
const Boom = require('boom');
const FriendsRouter = new FriendsRoutes({});
const FriendsService = require('./../services/FriendsService');
const isAuthenticated = require('../middleware/isAuthenticated');

FriendsRouter
  .use(isAuthenticated)
  .get('/friends/:id', (req, res, next) => {
    const { id } = req.params;
    FriendsService.getOne(id)
      .then((friend) => {
        if (_.isEmpty(friend)) {
          throw Boom.notFound(`Friend not found, id = [${id}]`);
        }

        res.json(friend);
      })
      .catch(next);
  })
  .get('/friends', (req, res, next) => {
    const { from, number, query } = req.query;
    const options = {
      from: ~~from || 0,
      number: ~~number || 5,
      query: query || '',
    };
    FriendsService.search(options)
      .then((searchResult) => res.json(searchResult))
      .catch(next);
  });

module.exports = FriendsRouter;
