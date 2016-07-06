var config = require('./config.global');
config.env = 'test';
config.db.url = 'localhost/myAppTest';

module.exports = config;
