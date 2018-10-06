const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  // for input validation
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['username', 'name', 'email', 'githubId'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static getById(id) {
    return this.query()
      .select()
      .where('id', id)
  }

  static getByGithub(github) {
    return this.query()
      .select()
      .where('githubId', github)
  }
}

module.exports = User;
