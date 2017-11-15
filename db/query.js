var db = require('./connection');

function createUser(data) {
  return db('users').insert(data);
}

function checkUser(user) {
  return db('users').first().where('username', user.username);
}

function checkGroup(group) {
  return db('groups').first().where('group_code', group);
}

function checkLogin(user) {
  return db('users').first().where({
    'username': user.username,
    'password': user.password
  });
}

function getGroupName(group_id) {
  return db('groups').first().where('id', group_id);
}

function getHelps(group_id) {
  return db('helps').select('helps.id as help_id', '*').where('helps.group_id', group_id)
    .innerJoin('users', 'helps.user_id', 'users.id')
}

function getAnswers(group_id) {
  return db('helps').select('helps.id as help_id', '*').where('helps.group_id', group_id)
    .innerJoin('users', 'helps.user_id', 'users.id').innerJoin('answers', 'answers.help_id', 'helps.id');
}

function getCategoryId(cat_name) {
  return db('categories').where('category_name', cat_name);
}

function getHelpInfo(help_id) {
  return db('helps').select('helps.id as help_id', 'helps.user_id as help_user_id', 'helps.readableTime as help_time', '*').where('helps.id', help_id)
    .innerJoin('users', 'users.id', 'helps.user_id');
}

function getHelpAnswers(help_id) {
  return db('answers').select('*').where('answers.help_id', help_id).innerJoin('users', 'users.id', 'answers.user_id')
}

function createHelp(newHelp) {
  return db('helps').insert(newHelp).returning('*');
}

function createAnswer(answer) {
  return db('answers').insert(answer).returning('*');
}

function getUserGroupInfo(userId) {
  return db('users').where('users.id', userId).select().innerJoin('groups', 'users.group_id', 'groups.id')
}

function getHelpInfoCat(help_id) {
  return db('helps').select('helps.id as help_id', 'helps.user_id as help_user_id', 'helps.readableTime as help_time', '*').where('helps.id', help_id)
    .innerJoin('users', 'users.id', 'helps.user_id')
    .innerJoin('categories', 'categories.id', 'helps.category_id');
}

function editHelp(id, data) {
  return db('helps').where('id', id).update(data)
}
module.exports = {
  checkUser,
  createUser,
  checkGroup,
  checkLogin,
  getGroupName,
  getHelps,
  getAnswers,
  getCategoryId,
  getHelpInfo,
  createHelp,
  createAnswer,
  getUserGroupInfo,
  getHelpAnswers,
  getHelpInfoCat,
  editHelp,
};
