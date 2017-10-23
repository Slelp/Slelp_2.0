
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('answers', (table) => {
      table.increments();
      table.integer('help_id').references('helps.id').onDelete('CASCADE');
      table.text('answer');
      table.string('link_1');
      table.string('link_2');
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.string('timestamp');
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('answers');
};
