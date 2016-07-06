var fs = require('fs');

var jobs = [];

exports.init = function () {
  fs.readFile(__dirname + '/../jobs.json', { encoding: 'utf8' }, function (err, data) {
    if (err) throw err;
    JSON.parse(data).forEach(function (job) {
      jobs.push(job);
    });
  });
}

exports.jobs = jobs;
