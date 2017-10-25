
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('helps', (table) => {
      table.increments();
      table.integer('group_id').references('groups.id').onDelete('CASCADE');
      table.string('title');
      table.text('description');
      table.string('link');
      table.integer('category_id').references('categories.id').onDelete('CASCADE');
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.string('timestamp');
      table.string('readableTime');
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('helps');
};
