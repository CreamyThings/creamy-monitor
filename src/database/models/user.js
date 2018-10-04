const { Model } = require('objection');
const knex = require('../bootstrap');

// Give the knex object to objection.
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  // for input validation
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email'],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  get(id) {
    return this.query()
      .select()
      .where('id', id)
  }
}

module.exports = User;
