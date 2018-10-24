const { Model } = require('objection');

class Check extends Model {
  static get tableName() {
    return 'checks';
  }

  // for input validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'type',
      ],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string', minLength: 1, maxLength: 255 },
        initialized: { type: 'boolean' },
        healthy: { type: 'boolean' },
        request: { type: 'object' },
        notifications: { type: 'object' },
      },
    };
  }
}

module.exports = Check;
