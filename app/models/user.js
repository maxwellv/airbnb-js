'use strict';

//var bcrypt = require('bcrypt');
//var Mongo = require('mongodb');
//var User;
//var users = global.nss.db.collection('users');
//var fs = require('fs');
//var path = require('path');

module.exports = User;
function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
}
