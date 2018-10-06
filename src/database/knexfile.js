const config = require('../config/database');

module.exports = {
  client: config.databaseType,
  connection: {
    host: config.databaseHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName,
  },
  migrations: {
    tableName: 'migrations',
  }
};
