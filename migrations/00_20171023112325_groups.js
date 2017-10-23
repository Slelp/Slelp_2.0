
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('groups', (table) => {
      table.increments();
      table.string('group_name');
      table.string('group_code');
  })
]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('groups');
};
