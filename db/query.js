var db = require('./connection');

function createUser(data) {
  return db('users').insert(data);
}

function checkUser(user) {
  return db('users').first().where('username', user.username);
}

function getUser(id) {
  return db('users').first().where('id', id);
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
  return db('helps').where('group_id', group_id);
}

function getHelpUser(user) {
  return db('users').first().where('id', user);
}

function getAnswers(help_id) {
  return db('answers').where('help_id', help_id);
}

function getCategory(cat_id) {
  return db('categories').where('id', cat_id);
}

function getCategoryId(cat_name) {
  return db('categories').where('category_name', cat_name);
}

function getHelpInfo(help_id) {
  return db('helps').where('id', help_id);
}

function getAnswerUser(id) {
  return db('users').where('id', id);
}

function createHelp(newHelp) {
  return db('helps').insert(newHelp).returning('*');
}

function createAnswer(answer) {
  return db('answers').insert(answer).returning('*');

}

module.exports = {
  checkUser,
  createUser,
  checkGroup,
  checkLogin,
  getGroupName,
  getHelps,
  getHelpUser,
  getAnswers,
  getCategory,
  getCategoryId,
  getHelpInfo,
  getAnswerUser,
  createHelp,
  createAnswer,
  getUser,

};
