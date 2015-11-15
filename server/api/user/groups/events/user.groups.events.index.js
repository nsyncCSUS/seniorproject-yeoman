'use strict';

var controller = require('./user.groups.events.controller');
var auth = require('../../../../auth/auth.service');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
