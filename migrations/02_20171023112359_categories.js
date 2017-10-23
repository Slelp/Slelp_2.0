
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', (table) => {
      table.increments();
      table.string('category_name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('categories');
};
