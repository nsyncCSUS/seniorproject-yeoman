'use strict';

var controller = require('./user.groups.creatorOf.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:groupId', controller.show);

module.exports = router;
