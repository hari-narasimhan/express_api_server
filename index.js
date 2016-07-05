var express = require('express');
var bodyParser = require('body-parser');
var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');

var fs = require('fs');
var _ = require('lodash');

var app = express();

app.use(bodyParser.json());

// extended: true allows rich query string to be parsed
app.use(bodyParser.urlencoded({ extended: true }));

var jobs = [];

fs.readFile('jobs.json', { encoding: 'utf8' }, function (err, data) {
  if (err) throw err;
  JSON.parse(data).forEach(function (job) {
    jobs.push(job);
  });
});

app.get('/', function (req, res) {
  res.send('Hello from express api server');
});

app.get('/api/v1/jobs', function (req, res) {
  res.send(JSON.stringify(jobs));
});

app.get('/api/v1/jobs/:jobId', function (req, res) {
  var jobId = req.params.jobId;
  var result = _.find(jobs, { _id: jobId }) || [];
  var status = result.length > 0 ? 200 : 404;
  res.status(status).send(JSON.stringify(result));
});

function validateJob(job) {
  var result = { errors: [] };
  if (_.isUndefined(job.name)) {
    result.errors.push({ code: '1001', description: 'Job name not specified' });
  }

  return result;
}

function saveJob(job) {
  var newJob = {};
  newJob._id = chance.guid();
  newJob.name = job.name;
  newJob.createdAt = moment().unix();
  newJob.params = job.params || {};
  newJob.status = 'created';
  jobs.push(newJob);
  return newJob;
}

app.post('/api/v1/jobs', function (req, res) {
  var payload = req.body;
  var result = validateJob(payload);

  if (result.errors.length > 0) {
    return res.status(400).send(JSON.stringify(result));
  }

  var savedJob = saveJob(payload);
  return res.status(201).send(JSON.stringify(savedJob));
});


function updateJob(job) {
  var currentJob = _.find(jobs, { _id: job._id });
  var updatedJob = Object.assign({}, currentJob);
  updatedJob.when = job.when || updatedJob.when;
  updatedJob.params = job.params || updateJob.params;
  updatedJob.updatedAt = moment().unix();
  // Find item index using indexOf+find
  var index = _.indexOf(jobs, currentJob);

  // Replace item at index using native splice

  arr.splice(index, 1, updatedJob);
  return updatedJob;

}

app.put('/api/v1/jobs/:jobId', function (req, res) {
  var jobId = req.params.jobId;
  var payload = req.body;
  var result = _.find(jobs, { _id: jobId }) || {};
  var status = _.isEmpty(result) ? 404 : 200;

  if (status === 404) {
    return res.status(status)
              .send({ errors: [{ code: 1002, description: 'Job not found' }] });
  }

  if (result.status  !== 'created') {
    return res.status(400)
          .send({ errors: [{
              code: 1003,
              description: 'Invalid job status for this operation, expected status is "created"',
            },
          ], }
          );
  }

  var updatedJob = updateJob(payload);
  return res.status(status).send(JSON.stringify(updatedJob));
});

function deleteJob(jobId) {
  _.remove(jobs, function (job) {
    return job._id === jobId;
  });
};

app.delete('/api/v1/jobs/:jobId', function (req, res) {
  var jobId = req.params.jobId;
  var payload = req.body;
  var result = _.find(jobs, { _id: jobId }) || {};
  var status = _.isEmpty(result) ? 404 : 200;

  if (status === 404) {
    return res.status(status)
              .send({ errors: [{ code: 1002, description: 'Job not found' }] });
  }

  if (result.status  !== 'created') {
    return res.status(400)
          .send({ errors: [{
              code: 1003,
              description: 'Invalid job status for this operation, expected status is "created"',
            },
          ], }
          );
  }

  deleteJob(jobId);
  return res.status(status).send({ message: 'Job deleted successfully' });
});

var server = app.listen(8888, function () {
  console.log('Server started at ' + server.address().port);
});
