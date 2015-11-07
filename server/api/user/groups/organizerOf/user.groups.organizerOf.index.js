'use strict';

var controller = require('./user.groups.organizerOf.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:groupId', controller.show);
router.post('/', controller.create);
router.delete('/:groupId', controller.destroy);

module.exports = router;
