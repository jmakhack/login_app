'use strict';

var _ = require('lodash');
var User = require('./user.model');
var exec = require('child_process').exec;

var SUCCESS = 1;
var ERR_BAD_CREDENTIALS = -1;
var ERR_USER_EXISTS = -2;
var ERR_BAD_USERNAME = -3;
var ERR_BAD_PASSWORD = -4;
var MAX_USERNAME_LENGTH = 128;
var MAX_PASSWORD_LENGTH = 128;

exports.getAll = function(req, res) {
  User.find(function (err, users) {
    if(err) {
      return res.send(500, err);
    } else {
      return res.json(200, users);
    }
  });
};

exports.add = function(req, res) {
  User.count({user: req.body.user}, function(err, count) {
    if(err) {
      return res.send(500, err);
    } else if(count > 0) {
      res.send({errCode: ERR_USER_EXISTS});
      return {errCode: ERR_USER_EXISTS};
    } else if(req.body.user === undefined || req.body.user === "" || req.body.user.length > MAX_USERNAME_LENGTH) {
      res.send({errCode: ERR_BAD_USERNAME});
      return {errCode: ERR_BAD_USERNAME};
    } else if(req.body.password !== undefined && req.body.password.length > MAX_PASSWORD_LENGTH) {
      res.send({errCode: ERR_BAD_PASSWORD});
      return {errCode: ERR_BAD_PASSWORD};
    } else {
      User.create(req.body, function(err, user) {
        if(err) {
          return res.send(500, err);
        } else {
          res.send({errCode: SUCCESS, count: 1});
          return {errCode: SUCCESS, count: 1};
        }
      });
    }
  });
};

exports.login = function(req, res) {
  User.findOne({user: req.body.user}, function(err, user) {
    if(err) {
      return res.send(500, err);
    } else if(user !== null && (user.password === req.body.password || (user.password === '' && req.body.password === undefined))) {
      user.count += 1;
      user.save(function (err, product, numAffected) {
        if (err) { 
          return res.send(500, err);
        } else {
          res.send({errCode: SUCCESS, count: user.count});
          return {errCode: SUCCESS, count: user.count};
        }
      });
    } else {
      res.send({errCode: ERR_BAD_CREDENTIALS});
      return {errCode: ERR_BAD_CREDENTIALS};
    }
  });
};

exports.resetFixture = function(req, res) {
  User.remove(function(err, user) {
    if(err) {
      return res.send(500, err);
    } else {
      res.send({errCode: SUCCESS});
      return {errCode: SUCCESS}; 
    }
  });
};

exports.runTests = function(req, res) {
  exec('npm test', function(err, stdout, stderr) {
    if(err) {
      return res.send(500, err);
    } else {
      res.send()
    }
  });
};