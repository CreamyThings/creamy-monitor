exports.up = function(knex, Promise) {
  knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('name');
    table.string('email');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users');
};
