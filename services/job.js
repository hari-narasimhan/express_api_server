
var Job = require('../models/job');
var moment = require('moment');

exports.create = function (payload, callback) {

  var job = new Job(payload);
  job.when = moment().unix();
  job.status = 'created';
  job.params = payload.params || {};

  job.save(function (err) {

    if (err) return callback(err);

    return callback(undefined, job.toObject());
  });
};

exports.findAll = function (callback) {
  Job.find({}, function (err, foundJobs) {
    if (err) return callback(err);

    return callback(undefined, foundJobs);
  });
};

exports.findById = function (jobId, callback) {
  Job.findById(jobId, function (err, job) {
    if (err) return callback(err);

    if (!job) {
      return callback({ errors: [{ code: 1002, description: 'Job not found' }] });
    }

    return callback(undefined, job.toObject());
  });
};

exports.update = function (jobId, payload, callback) {
  Job.findById(jobId, function (err, job) {

    if (err) return callback(err);

    if (!job) {
      return callback({ errors: [{ code: 1002, description: 'Job not found' }] });
    }

    if (job.status !== 'created') {
      return callback({ errors: [
        {
          code: 1003,
          description: 'Invalid job status for this operation, expected status is "created"',
        },
      ],
      });
    }

    job.params = payload.params || job.params;
    job.when = payload.when || job.when;

    job.save(function (err) {
      if (err) return callback(err);

      return callback(job.toObject());
    });

  });

};

exports.removeById = function (jobId, callback) {
  Job.findById(jobId, function (err, job) {

    if (err) return callback(err);

    if (!job) {
      return callback({ errors: [{ code: 1002, description: 'Job not found' }] });
    }

    if (job.status !== 'created') {
      return callback({ errors: [
        {
          code: 1003,
          description: 'Invalid job status for this operation, expected status is "created"',
        },
      ],
      });
    }

    Job.remove({ _id: jobId }, function (err) {
      if (err) return callback(err);

      return callback();
    });

  });
};
