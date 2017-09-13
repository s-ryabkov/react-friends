const request = require('supertest');
const app = require('./../../app');

describe('REST /api/friends', () => {

  let token;

  beforeAll(() => {
    const userData = {
      login: 'user@example.com',
      password: 'very_strong_password',
    };

    return request(app)
      .post('/api/login')
      .send(userData)
      .then(response => {
        token = response.body.token;
      });
  });

  it('GET /friends should respond with errors for not authorized user', () => {
    return request(app)
      .get('/api/friends')
      .query({ from: '0', number: '5', query: '' })
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('GET /friends using query should respond with array of friends', () => {
    const searchQuery = {
      from: 0,
      number: 5,
      query: '',
    };

    return request(app)
      .get('/api/friends')
      .set('Cookie', [`token=${token}`])
      .query(searchQuery)
      .then(response => {
        const { rows, number, from, total, query } = response.body;
        expect(Array.isArray(rows)).toBe(true);
        expect(from).toBe(searchQuery.from);
        expect(number).toBe(searchQuery.number);
        expect(query).toBe(searchQuery.query);
        expect(typeof Number(total)).toBe('number');

        expect(response.statusCode).toBe(200);
      });
  });

  it('GET /friends should using empty query respond with array of friends', () => {
    const defaultSearchQuery = {
      from: 0,
      number: 10,
      query: '',
    };

    return request(app)
      .get('/api/friends')
      .set('Cookie', [`token=${token}`])
      .then(response => {
        const { rows, number, from, total, query } = response.body;
        expect(Array.isArray(rows)).toBe(true);
        expect(from).toBe(defaultSearchQuery.from);
        expect(number).toBe(defaultSearchQuery.number);
        expect(query).toBe(defaultSearchQuery.query);
        expect(typeof Number(total)).toBe('number');

        expect(response.statusCode).toBe(200);
      });
  });

  it('GET /friends/:id should fail when user is not logged in', () => {
    const friendId = '';

    return request(app)
      .get(`/api/friends/${friendId}`)
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('GET /friends/:id should fail when when id is wrong', () => {
    const friendId = 'wrong_id';

    return request(app)
      .get(`/api/friends/${friendId}`)
      .set('Cookie', [`token=${token}`])
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });

  it('GET /friends/:id should return a friend for logged in user using correct friend id', () => {

    return request(app)
      .get('/api/friends')
      .set('Cookie', [`token=${token}`])
      .then(response => {
        const { rows } = response.body;
        const { id: friendId } = rows[0];

        return request(app)
          .get(`/api/friends/${friendId}`)
          .set('Cookie', [`token=${token}`])
          .then(response => {
            console.log(response.body);
            const { id, email, firstName, lastName, age, gender, birthDate } = response.body;
            expect(id).toBeDefined();
            expect(email).toBeDefined();
            expect(firstName).toBeDefined();
            expect(lastName).toBeDefined();
            expect(age).toBeDefined();
            expect(gender).toBeDefined();
            expect(birthDate).toBeDefined();
            expect(response.statusCode).toBe(200);
          });
      });
  });

});
