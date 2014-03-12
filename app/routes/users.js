'use strict';

var User = require('../models/user');

exports.register = function(req, res){
  res.render('users/fresh', {title:'Register a new user'});
};

exports.create = function(req, res){
  var fresh = new User(req.body);
  fresh.register(function(err, body){
    if (err === null){
      res.redirect('/');
    } else {
      res.render('users/fresh', {title:'Register a new user (ERROR: EMAIL ALREADY IN USE)'});
    }
  });
};
