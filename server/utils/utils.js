const uuidv1 = require('uuid/v1');

const Utils = {

  createUserWithLogin: (login) => {
    const number = Utils.getRandomInt(0, 100);
    return {
      id: uuidv1(),
      email: login,
      firstName: `John ${number}`,
      lastName: `Smith ${number}`,
    };
  },
  createUser: () => {
    const number = Utils.getRandomInt(0, 100);
    return {
      id: uuidv1(),
      email: `email${number}@example.com`,
      firstName: `John ${number}`,
      lastName: `Smith ${number}`,
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
   * @param {number} min
   * @param {number} max
   * @return {*}
   */
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },

};

module.exports = Utils;
