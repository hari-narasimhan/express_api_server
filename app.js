var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// extended: true allows rich query string to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the router
var router = require('./router')(app);

module.exports = app;
