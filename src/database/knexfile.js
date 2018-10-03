const config = require('../config/database');

module.exports = {
  development: {
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
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
