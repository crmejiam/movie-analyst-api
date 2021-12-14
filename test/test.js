process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../server');
let should = chai.should(); 
let nock = require('nock');

const API_IP = 'http://127.0.0.1:3000'
const mockAPI = nock(API_IP);

chai.use(chaiHttp);
//Our parent block
describe('API', () => {

  // Test the /GET Route
  describe('/GET home', () => {
      it('it should GET any reply', (done) => {

        mockAPI.get('/movies')
        .reply(200, [{
          "response" : 'hello'
        }]);

        chai.request(API_IP)
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
          res.body.should.have.lengthOf(1);
        done();
      });
    });
  });

  // Test the /reviewers API Endpoint
  describe('/GET reviewers', () => {
    it('it should GET a JSON with data of the reviewers', (done) => {

      mockAPI.get('/reviewers')
      .reply(200, [{
        "name":"Andrew West",
        "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg",
        "publication":"MyNextReview"
      }]);

      chai.request(API_IP)
      .get('/reviewers')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body[0].should.have.keys('name', 'avatar', 'publication');
          res.body.should.have.lengthOf(1);
        done();
      });
    });
  });

  // Test the /publications API Endpoint
  describe('/GET publications', () => {
    it('it should GET a JSON with data of the publications', (done) => {

      mockAPI.get('/publications')
      .reply(200, [{
        "name":"ComicBookHero.com",
        "avatar":"glyphicon-flash"
      }]);

      chai.request(API_IP)
      .get('/publications')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body[0].should.have.keys('name', 'avatar');
          res.body.should.have.lengthOf(1);
        done();
      });
    });
  });

  // Test the /pending API Endpoint
  describe('/GET pending', () => {
    it('it should GET a JSON with data of the pending movie reviews', (done) => {

      mockAPI.get('/pending')
      .reply(200, [{
        "title":"Doctor Strange",
        "release":"2016",
        "score":7,
        "reviewer":"Anthony Miller",
        "publication":"ComicBookHero.com"
      }]);

      chai.request(API_IP)
      .get('/pending')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body[0].should.have.keys('title', 'release', 'score', 'reviewer', 'publication');
          res.body.should.have.lengthOf(1);
        done();
      });
    });
  });

});
