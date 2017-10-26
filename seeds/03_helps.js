
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('helps').del()
    .then(function () {
      // Inserts seed entries
      return knex('helps').insert([
        {id: 1, group_id: 1, title: 'I Need Help Refactoring', description: 'I have one big function, how do I break it into smaller functions?', link: 'https://docs.google.com/document/d/1EaodMsjZyf_5u0go5saLB3conegZHDja0M-oCGxwdMc/edit?usp=sharing', category_id: 1, user_id: 3, timestamp: new Date().getTime(), readableTime: new Date()},
        {id: 2, group_id: 1, title: 'How do I write a For Loop?', description: 'Can someone please help me with this naughty for loop?', link: '', category_id: 4, user_id: 2, timestamp: new Date().getTime() + 1000, readableTime: new Date()},
        {id: 3, group_id: 1, title: 'How do I style CSS?', description: 'CSS and Flexbox are mean to me.', link: '', category_id: 3, user_id: 1, timestamp: new Date().getTime() + 2000, readableTime: new Date()},
      ]);
    });
};

// remove getTime Tuesday
