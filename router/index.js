
module.exports = function (app) {
  app.use('/api/v1/jobs', require('./routes/job'));
};
