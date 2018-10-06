const get = require('./getFromEnv');

module.exports = {
  client: get('GITHUB_CLIENT'),
  secret: get('GITHUB_SECRET'),
};
