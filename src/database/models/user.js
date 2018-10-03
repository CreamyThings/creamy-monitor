const db = require('../bootstrap');

const tableName = 'users';

const user = {
  getById: id => db
    .select()
    .from('users')
    .where('id', id),
};

module.exports = user;
