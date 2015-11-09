'use strict';

var creatorOf = require('./creatorOf/user.groups.creatorOf.index');
var organizerOf = require('./organizerOf/user.groups.organizerOf.index');
var volunteeredTo = require('./volunteeredTo/user.groups.volunteeredTo.index');
var controller = require('./user.groups.controller');
var auth = require('../../../auth/auth.service');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

//router.post('/', auth.isAuthenticated(), controller.create);
router.post('/', controller.create);
router.use('/creatorOf', creatorOf);
router.use('/organizerOf', organizerOf);
router.use('/volunteeredTo', volunteeredTo);

module.exports = router;
