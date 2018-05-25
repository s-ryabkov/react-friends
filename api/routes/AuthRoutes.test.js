const request = require('supertest');
const app = require('./../server');

describe('REST /api/auth', () => {

  it('POST /login it should not login with empty data', () => {

    const userData = {
      login: '',
      password: '',
    };

    return request(app)
      .post('/api/login')
      .send(userData)
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('POST /login it should login successfully', () => {

    const userData = {
      login: 'user@example.com',
      password: 'very_strong_password',
    };

    return request(app)
      .post('/api/login')
      .send(userData)
      .expect('set-cookie', /token/)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('GET /session should not return user info for not logged in user', () => {

    return request(app)
      .get('/api/session')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('GET /session should not return user info for empty auth token', () => {

    const token = '';

    return request(app)
      .get('/api/session')
      .set('Cookie', [`token=${token}`])
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('GET /session should get my user info for logged in user', () => {

    const userData = {
      login: 'user@example.com',
      password: 'very_strong_password',
    };

    return request(app)
      .post('/api/login')
      .send(userData)
      .then((response) => {
        const token = response.body.token;
        return request(app)
          .get('/api/session')
          .set('Cookie', [`token=${token}`])
          .then((response) => {
            expect(response.statusCode).toBe(200);
          });
      });
  });

  it('GET /logout should fail for not logged in user', () => {

    const token = '';

    return request(app)
      .get('/api/logout')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('GET /logout should fail for empty auth token', () => {

    const token = '';

    return request(app)
      .get('/api/logout')
      .set('Cookie', [`token=${token}`])
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('GET /logout should log out user successfully for logged in user', () => {

    const userData = {
      login: 'user@example.com',
      password: 'very_strong_password',
    };

    return request(app)
      .post('/api/login')
      .send(userData)
      .then((response) => {
        const token = response.body.token;
        return request(app)
          .get('/api/logout')
          .set('Cookie', [`token=${token}`])
          .then((response) => {
            expect(response.statusCode === 200 || response.statusCode === 302).toBe(true);
          });
      });
  });

});
