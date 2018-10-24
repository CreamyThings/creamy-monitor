
exports.up = knex => knex.schema.table('checks', (table) => {
  table.json('notifications');
});

exports.down = knex => knex.schema.table('checks', (table) => {
  table.dropColumn('notifications');
});
