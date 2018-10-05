const get = require('./getFromEnv');

module.exports = {
  databaseType: 'mysql2',
  databaseName: get('DB_NAME'),
  databaseHost: get('DB_HOST'),
  databaseUser: get('DB_USER'),
  databasePassword: get('DB_PASSWORD'),
};
