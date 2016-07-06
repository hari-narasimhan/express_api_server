var express = require('express');
var _ = require('lodash');
var jobs = require('../db').jobs;

var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');


var router = express.Router({ mergeParams: true });


router.get('/', function (req, res) {
  res.send(JSON.stringify(jobs));
});

router.get('/:jobId', function (req, res) {
  var jobId = req.params.jobId;
  var result = _.find(jobs, { _id: jobId }) || {};
  var status = _.isEmpty(result) ? 404 : 200;
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

router.post('/', function (req, res) {
  var payload = req.body;
  var result = validateJob(payload);

  if (result.errors.length > 0) {
    return res.status(400).send(JSON.stringify(result));
  }

  var savedJob = saveJob(payload);
  return res.status(201).send(JSON.stringify(savedJob));
});

function updateJob(jobId, payload) {
  var currentJob = _.find(jobs, { _id: jobId });
  console.log(currentJob);
  var updatedJob = Object.assign({}, currentJob);
  updatedJob.when = payload.when || updatedJob.when;
  updatedJob.params = payload.params || updateJob.params;
  updatedJob.updatedAt = moment().unix();
  // Find item index using indexOf+find
  var index = _.indexOf(jobs, currentJob);

  // Replace item at index using native splice

  jobs.splice(index, 1, updatedJob);
  return updatedJob;

}

router.put('/:jobId', function (req, res) {
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

  var updatedJob = updateJob(jobId, payload);
  return res.status(status).send(JSON.stringify(updatedJob));
});

function deleteJob(jobId) {
  _.remove(jobs, function (job) {
    return job._id === jobId;
  });
};

router.delete('/:jobId', function (req, res) {
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

module.exports = router;
