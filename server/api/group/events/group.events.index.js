'use strict';

var controller = require('./group.events.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.create);
router.delete('/:eventId', controller.destroy);

module.exports = router;
