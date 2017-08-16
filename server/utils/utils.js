const uuidv1 = require('uuid/v1');

const Utils = {

  createUserWithLogin: (login) => {
    return {
      id: uuidv1(),
      email: login,
      firstName: 'John',
      lastName: 'Shown',
    };
  },
  createUser: () => {
    return {
      id: uuidv1(),
      email: `email${Utils.getRandomInt(0, 100)}@example.com`,
      firstName: 'John',
      lastName: 'Shown',
    };
  },

  createRandomFriends: (num) => {
    const friends = [];
    for (let i = 0; i < num; i++) {
      friends.push(Utils.createUser());
    }
    return friends;
  },

  /**
   * @param [number] min
   * @param [number] max
   * @return {*}
   */
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },

};

module.exports = Utils;
