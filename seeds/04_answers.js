
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {
      // Inserts seed entries
      return knex('answers').insert([
        {id: 1, help_id: 1, answer: 'This is the answer to your help, young ruffian.', link_1: 'https://docs.google.com/document/d/1a7OrqH4LOoBqR2fFruMwRsSACl38i7hvgDp-E0alDh0/edit?usp=sharing', link_2: '', user_id: 3, timestamp: new Date().getTime() + 100},
      ]);
    });
};
