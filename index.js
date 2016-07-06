var app = require('./app');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.db.url, function (err) {
  if (err) {
    console.log(err);
    return process.exit();
  }

  // Connected to mongo, let us start the server
  var server = app.listen(config.app.port, function () {
    console.log('Server started at ' + server.address().port);
  });
});
