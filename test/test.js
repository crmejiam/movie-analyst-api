process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect(); 
let nock = require('nock');

const API_IP = 'http://127.0.0.1:3000'
const mockAPI = nock(API_IP);

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

      mockAPI.get('/movies')
      .reply(200, [{
        "title":"Batman V Superman",
        "release":"2016",
        "score":6,
        "reviewer":"Martin Thomas"
      }]);

      chai.request(API_IP)
      .get('/movies')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body[0].should.have.keys('title', 'release', 'score', 'reviewer');
        done();
      });
    });
  });
});
