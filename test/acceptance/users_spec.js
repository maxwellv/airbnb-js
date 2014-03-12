/* jshint expr:true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
//var exec = require('child_process').exec;
var User;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('GET /register', function(){
    it('should display the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('POST /register', function(){
    it('should register a new user', function(done){
      request(app)
      .post('/register')
      .field('email', 'max.vance+ACCEPTANCE_TEST@gmail.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not register a duplicate user', function(done){
      request(app)
      .post('/register')
      .field('email', 'max.vance+ACCEPTANCE_TEST@gmail.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){ //we have to do this twice since the DB gets dropped in between each it block
        request(app)
        .post('/register')
        .field('email', 'max.vance+ACCEPTANCE_TEST@gmail.com')
        .field('password', '1234')
        .field('role', 'host')
        .end(function(err, res){
          expect(res.status).to.equal(200);
          expect(res.text).to.include('ERROR');
          done();
        });
      });
    });
  });

});
