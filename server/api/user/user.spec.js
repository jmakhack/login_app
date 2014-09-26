'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var controller = require('./user.controller');
var assert = require('assert');

describe('POST /TESTAPI/resetFixture', function () {
  it('should clear db', function (done) {
    request(app)
      .post('/TESTAPI/resetFixture')
      .type('json')
      .send({})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, 1);
        done();
      });
  });
});

describe('POST /users/add', function () {
  it('should add user to db', function (done) {
    request(app)
      .post('/users/add')
      .type('json')
      .send({user: "Josh", password: "12345"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, 1);
        assert.equal(res.body.count, 1);
        done();
      });
  });
  it('should add second user to db', function (done) {
    request(app)
      .post('/users/add')
      .type('json')
      .send({user: "Cat"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, 1);
        assert.equal(res.body.count, 1);
        done();
      });
  });
  it('should return ERR_USER_EXISTS', function (done) {
    request(app)
      .post('/users/add')
      .type('json')
      .send({user: "Cat", password: "meow"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, -2);
        done();
      });
  });
  it('should return ERR_BAD_USERNAME', function (done) {
    request(app)
      .post('/users/add')
      .type('json')
      .send({user: "", password: "abcdefghijklmnop"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, -3);
        done();
      });
  });
  it('should return ERR_BAD_USERNAME', function (done) {
    request(app)
      .post('/users/add')
      .type('json')
      .send({user: "abcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnop", password: "abcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnop"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, -3);
        done();
      });
  });
  it('should return ERR_BAD_PASSWORD', function (done) {
    request(app)
      .post('/users/add')
      .type('json')
      .send({user: "abc", password: "abcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnopabcdefghijklmnop"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, -4);
        done();
      });
  });
});

describe('POST /users/login', function () {
  it('login user: Josh', function (done) {
    request(app)
      .post('/users/login')
      .type('json')
      .send({user: "Josh", password: "12345"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, 1);
        assert.equal(res.body.count, 2);
        done();
      });
  });
  it('should return ERR_BAD_CREDENTIALS', function (done) {
    request(app)
      .post('/users/login')
      .type('json')
      .send({user: "Cat", password: "12345"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, -1);
        done();
      });
  });
  it('login user: Josh (2nd time)', function (done) {
    request(app)
      .post('/users/login')
      .type('json')
      .send({user: "Josh", password: "12345"})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, 1);
        assert.equal(res.body.count, 3);
        done();
      });
  });
});

describe('POST /TESTAPI/resetFixture', function () {
  it('should clear db', function (done) {
    request(app)
      .post('/TESTAPI/resetFixture')
      .type('json')
      .send({})
      .expect(200)
      .end(function (err, res) {
        assert.equal(res.body.errCode, 1);
        done();
      });
  });
});