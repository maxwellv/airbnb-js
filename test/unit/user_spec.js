'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var User;
var sue;

describe('User', function(){
  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      sue = new User({email: 'sue@nomail.com', role:'host', password:'1234'});
      sue.register(function(err){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new User object', function(done){
      var u1 = new User({email: 'bob@nomail.com', role:'host', password:'1234'});
      expect(u1).to.be.instanceof(User);
      expect(u1.email).to.equal('bob@nomail.com');
      expect(u1.password).to.equal('1234');
      expect(u1.role).to.equal('host');
      done();
    });
  });

  describe('register', function(){
    it('should register a new user', function(done){
      var u1 = new User({email: 'bob@nomail.com', role:'host', password:'1234'});
      u1.register(function(err){
        expect(err).to.equal(null);
        expect(u1.password).to.not.equal('1234');
        expect(u1.password).to.have.length(60);
        expect(u1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('dupeCheck', function(){
    it('should not register a duplicate user', function(done){
      var u1 = new User({email: 'sue@nomail.com', role:'host', password:'1234'});
      u1.register(function(err){
        expect(typeof err).to.equal('object'); //Errors are of type object
        done();
      });
    });
  });

});
