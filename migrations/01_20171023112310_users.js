
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments().primary();
      table.string('username');
      table.string('password');
      table.integer('group_id').references('groups.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users');
};
