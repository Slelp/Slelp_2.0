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

function getInfo(user) {
  // return db.select('group_name').from('groups').innerJoin('users', user.group_id, 'groups.id');
    return db('groups').innerJoin('users', user.group_id, 'groups.id').returning('groups.group_name');
}

module.exports = {
  checkUser,
  createUser,
  checkGroup,
  checkLogin,
  getInfo
};
