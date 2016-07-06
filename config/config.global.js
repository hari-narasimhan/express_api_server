var config = { app: {}, db: {} };

config.env = 'dev';
config.app.port = process.env.PORT || 8888;

config.db.url = 'localhost/myAppDev';
config.SECRET_TOKEN = 'B1GS3CR3T';

module.exports = config;
