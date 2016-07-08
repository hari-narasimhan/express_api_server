
// set the environment to test
process.env.NODE_ENV = 'test';

// Require the index to connect to mongoose
require('../index');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var mongoose = require('mongoose');

var server = require('../app');

var Job = require('../models/job');

chai.use(chaiHttp);

describe('Jobs ', function () {
  Job.collection.drop();
  it('Should successfully create a new job', function (done) {
    chai.request(server)
      .post('/api/v1/jobs')
      .send({ name: 'jb_dbm', params: { clientId: 555121 }, })
      .end(function (err, res) {
        res.should.have.status(201);
        done();
      });
  });

  it('Should list all jobs', function (done) {
    chai.request(server)
      .get('/api/v1/jobs')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('Should return 404 if job is not found', function (done) {
    var id = mongoose.Types.ObjectId();
    chai.request(server)
      .get('/api/v1/jobs/' + id)
      .end(function (err, res) {
        res.should.have.status(404);
        done();
      });
  });
});
