
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('helps').del()
    .then(function () {
      // Inserts seed entries
      return knex('helps').insert([
        {id: 1, group_id: 1, title: 'I Need Help Refactoring', description: 'I have one big function, how do I break it into smaller functions?', link: 'https://docs.google.com/document/d/1EaodMsjZyf_5u0go5saLB3conegZHDja0M-oCGxwdMc/edit?usp=sharing', category_id: 1, user_id: 3, timestamp: new Date().getTime()},
      ]);
    });
};

// remove getTime Tuesday
