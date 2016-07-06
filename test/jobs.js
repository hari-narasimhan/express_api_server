
// set the environment to test
process.env.NODE_ENV = 'test';

// Require the index to connect to mongoose
require('../index');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var server = require('../app');

var Job = require('../models/job');

chai.use(chaiHttp);

describe('Create a job', function () {
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
});
