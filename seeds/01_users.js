
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Kelsey', password: 'abcd', group_id: 1},
        {id: 2, username: 'Luke', password: 'abcd', group_id: 1},
        {id: 3, username: 'Kyle', password: 'abcd', group_id: 1},
        {id: 4, username: 'Leo', password: 'abcd', group_id: 1},
      ]);
    });
};
