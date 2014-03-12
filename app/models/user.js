'use strict';

var bcrypt = require('bcrypt');
//var Mongo = require('mongodb');
var User;
var users = global.nss.db.collection('users');
//var fs = require('fs');
//var path = require('path');

module.exports = User;
function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
}

User.prototype.register = function(fn){
  var self = this;
  hashPassword(self.password, function(hashed){
    self.password = hashed;
    dupeCheck(self.email, function(dupeResult){
      if (dupeResult){ //dupeCheck will return true if there is NOT a duplicate email in the DB
        insert(self, function(err){
          fn(err);
        });
      } else {
        fn(new Error('You tried to register a duplicate user.'));
      }
    });
  });
};

function insert(user, fn){
  users.insert(user, function(err, record){
    fn(err);
  });
}

function hashPassword(password, fn){
  bcrypt.hash(password, 8, function(err, hash){
    fn(hash);
  });
}

function dupeCheck(email, fn){
  users.findOne({email: email}, function(foundUser){
    if (foundUser === null){
      fn(true);
    } else {
      fn(false);
    }
  });
}

