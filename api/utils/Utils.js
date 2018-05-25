const uuidv1 = require('uuid/v1');

const Utils = {

  /**
   * @param {string} login
   * @return {{id: *, email: *, firstName: string, lastName: string}}
   */
  createUserWithLogin: (login) => {
    const number = Utils.getRandomInt(0, 100);
    return {
      id: uuidv1(),
      email: login,
      firstName: `John ${number}`,
      lastName: `Smith ${number}`,
    };
  },

  /**
   * @return {{id: *, email: *, firstName: string, lastName: string}}
   */
  createUser: () => {
    const number = Utils.getRandomInt(0, 100);
    return {
      id: uuidv1(),
      email: `email${number}@example.com`,
      firstName: `John ${number}`,
      lastName: `Smith ${number}`,
    };
  },

  /**
   * @return {{id: *, email: string, firstName: string, lastName: string, age: (*|number), gender: string, birthDate: Date}}
   */
  createFriend: () => {
    const number = Utils.getRandomInt(0, 100);
    const age = Utils.getRandomInt(16, 80);
    const gender = Utils.getRandomInt(0, 100) % 2 ? 'M' : 'F';
    const now = new Date();
    return {
      id: uuidv1(),
      email: `email${number}@example.com`,
      firstName: `${gender === 'M' ? 'John' : 'Martha'} ${number}`,
      lastName: `Smith ${number}`,
      age,
      gender,
      birthDate: new Date(now.getYear() + 1900 - age, Utils.getRandomInt(0, 11), Utils.getRandomInt(1, 28), 0, 0, 0),
    };
  },

  /**
   * @param {number} num
   * @return {{id: *, email: string, firstName: string, lastName: string, age: (*|number), gender: string, birthDate: Date}}
   */
  createRandomFriends: (num) => {
    const friends = [];
    for (let i = 0; i < num; i++) {
      friends.push(Utils.createFriend());
    }
    return friends;
  },

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },

};

module.exports = Utils;
