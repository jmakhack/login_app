'use strict';

var express = require('express');
var controller = require('./user.controller');
var router = express.Router();

router.get('/users', controller.getAll);
router.post('/users/add', controller.add);
router.post('/users/login', controller.login);
router.post('/TESTAPI/resetFixture', controller.resetFixture);
router.post('/TESTAPI/unitTests', controller.runTests);

module.exports = router;