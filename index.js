var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');

var app = express();

app.use(bodyParser.json());

// Initialize Database
db.init();

// extended: true allows rich query string to be parsed
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello from express api server');
});

app.use('/api/v1/jobs', require('./routes/jobs'));

var server = app.listen(8888, function () {
  console.log('Server started at ' + server.address().port);
});
