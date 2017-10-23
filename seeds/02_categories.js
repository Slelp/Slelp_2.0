
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, category_name: 'Misc'},
        {id: 2, category_name: 'HTML'},
        {id: 3, category_name: 'CSS'},
        {id: 4, category_name: 'JavaScript'},
        {id: 5, category_name: 'Express.js'},
        {id: 6, category_name: 'Node.js'},
      ]);
    });
};
