'use strict';

var controller = require('./user.events.organizerOf.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.post);
router.delete('/:eventId', controller.destroy);

module.exports = router;
