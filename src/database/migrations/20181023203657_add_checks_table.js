
exports.up = knex => knex.schema.createTable('checks', (table) => {
  table.increments().primary();

  // a check can belong to a user
  table.integer('user_id').unsigned().nullable();
  table.foreign('user_id').onDelete('cascade');

  // a check can have a human-readable name
  table.string('name');
  // a check has a type ("to-service", "from-service")
  table.string('type').notNullable();

  // if true, the check has been healthy at least once
  table.boolean('initialized').default(false);
  // if true, the check is currently healthy
  table.boolean('healthy').default(false);

  // the interval, in seconds, of how often to send to-service checks
  table.integer('interval').unsigned().default(30);

  // the request to send.
  table.json('request');
});

exports.down = knex => knex.schema.dropTable('checks');
