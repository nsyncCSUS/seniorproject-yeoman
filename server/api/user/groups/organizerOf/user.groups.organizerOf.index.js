'use strict';

var controller = require('./user.groups.organizerOf.controller');
var auth = require('../../../../auth/auth.service');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:groupId', controller.show);
router.post('/:groupId', auth.isAuthenticated(), controller.create);
router.delete('/:groupId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
