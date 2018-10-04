const bcrypt = require('bcryptjs');
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  // for input validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static getById(id) {
    return this.query()
      .select()
      .where('id', id);
  }

  static getByUsername(username) {
    return this.query()
      .select()
      .where('username', username)
  }

  validate(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
