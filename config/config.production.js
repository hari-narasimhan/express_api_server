var config = require('./config.global');
config.env = 'production';
config.db.url = 'localhost/myAppProduction';

module.exports = config;
