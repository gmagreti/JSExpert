const { describe, it, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');
describe('API Suite test', () => {
  let app
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  })

  after(done => app.close(done))

  describe('/contact:get', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);
      assert.deepStrictEqual(response.text, 'Contact us page');
    })
  })

  describe('/login:post', () => {
    it('should request the login and return HTTP Status 200', async () => {
      const response = await supertest(app).post('/login').send({ username: "admin", password: "admin" }).expect(200);
      assert.deepStrictEqual(response.text, 'Login has succeeded');
    })

    it('should not authenticate user with wrong credentials and return HTTP Status 401', async () => {
      const response = await supertest(app).post('/login').send({ username: "admin", password: "wrong" }).expect(401);
      assert.deepStrictEqual(response.text, 'Logging failed');
    })
  })

  describe('/default', () => {
    it('should return default content', async () => {
      const response = await supertest(app).get('/').expect(200);
      assert.deepStrictEqual(response.text, 'Not found');
    })
  })  
})