process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let nock = require('nock');

const endpoint = 'http://127.0.0.1:3000'

chai.use(chaiHttp);
//Our parent block
describe('API', () => {

  // Test the /GET Route
  describe('/GET home', () => {
      it('it should GET any reply', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });

  // Test the /movies API Endpoint
  describe('/GET movies', () => {
    it('it should GET a JSON with data of the movies', (done) => {
      let request = nock(endpoint)
        .get('/movies')
        .reply(200, movies = [{
          "title":"Batman V Superman",
          "release":"2016",
          "score":6,
          "reviewer":"Martin Thomas"
        }])
        request.should.have.status(200);
        request.movies.should.be.an('array');
        request.movies.should.have.keys('title', 'release', 'score', 'reviewer');
    });
  });
});
