'use strict';

var controller = require('./user.events.creatorOf.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:eventId', controller.show);

module.exports = router;
