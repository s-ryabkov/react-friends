const Utils = require('./../../utils/utils');
const Promise = require('bluebird');
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
      .filter((friend) => !options.query || (friend.firstName === options.query || friend.lastName === options.query))
      .slice(options.from, options.from + options.number);
    const searchResult = {
      rows: foundFriends,
      number: foundFriends.length,
      from: options.from,
      total: FRIENDS.length,
      query: options.query,
    };
    return Promise.resolve(searchResult);
  },
};

module.exports = FriendsService;
