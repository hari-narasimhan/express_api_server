var express = require('express');
var JobService = require('../../services/job');
var _ = require('lodash');

var router = express.Router({ mergeParams: true });

router.get('/', function (req, res) {
  JobService.findAll(function (err, jobs) {
    if (err) {
      return res.status(400)
      .send({ errors: [{ code: 5001, description: 'Unable to find jobs' }] });
    }

    return res.status(200).send(jobs);
  });
});

router.get('/:jobId', function (req, res) {
  var jobId = req.params.jobId;
  JobService.findById(jobId, function (err, job) {
    if (err) {
      var status = _.find(err.errors, { code: 1002 }) ? 404 : 400;
      return res.status(status).send(err);
    }

    return res.status(200).send(job);
  });

});

router.post('/', function (req, res) {
  var payload = req.body;
  JobService.create(payload, function (err, job) {
    if (err) return res.status(400).send(err);

    return res.status(201).send(job);
  });
});

router.put('/:jobId', function (req, res) {
  var jobId = req.params.jobId;
  var payload = req.body;
  JobService.update(jobId, payload, function (err, job) {
    if (err) return res.status(400).send(err);

    return res.status(200).send(job);
  });
});

router.delete('/:jobId', function (req, res) {
  var jobId = req.params.jobId;

  JobService.removeById(jobId, function (err) {
    if (err) return res.status(400).send(err);

    return res.sendStatus(200);
  });
});

module.exports = router;
