const Utils = require('./../utils/Utils');
const Promise = require('bluebird');
const _ = require('lodash');
//TODO: use separate file as a stub-storage?
const FRIENDS = Utils.createRandomFriends(31);

const FriendsService = {

  getOne: (id) => {
    return Promise.resolve(FRIENDS.find((friend) => friend.id === id));
  },
  /**
   * @param {object} options
   * @param {number} options.from
   * @param {number} options.number
   * @param {string} options.query
   */
  search: (options) => {
    const foundFriends = FRIENDS
      .sort((f1, f2) => {
        if (f1.firstName > f2.firstName) {
          return 1;
        }
        if (f1.firstName < f2.firstName) {
          return -1;
        }
        return 0;
      })
      .filter((friend) => {
        return !options.query ||
          _.includes(friend.firstName, options.query) ||
          _.includes(friend.lastName, options.query);
      });
    const pageOfFriends = foundFriends.slice(options.from, options.from + options.number);
    const searchResult = {
      rows: pageOfFriends,
      number: options.number,
      from: options.from,
      total: foundFriends.length,
      query: options.query,
    };
    return Promise.resolve(searchResult);
  },
};

module.exports = FriendsService;
