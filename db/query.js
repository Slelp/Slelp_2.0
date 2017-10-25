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
  return db('users').first().where({'username': user.username, 'password': user.password});
}

function getGroupName(group_id) {
    return db('groups').first().where('id', group_id);
}

function getHelps(group_id){
  return db('helps').where('group_id', group_id);
}

function getHelpUser(user){
  return db('users').first().where('id', user);
}

function getAnswers(help_id){
  return db('answers').where('help_id', help_id);
}

function getCategory(cat_id){
  return db('categories').where('id', cat_id);
}

function getHelpInfo(help_id) {
  return db('helps').where('id', help_id);
}

function getAnswerUser(id) {
  return db('users').where('id', id);
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
  getHelpInfo,
  getAnswerUser
};
