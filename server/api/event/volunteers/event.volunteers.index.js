'use strict';

var controller = require('./event.volunteers.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:volunteerId', controller.show);
router.post('/:volunteerId', controller.create);
router.delete('/:volunteerId', controller.destroy);

module.exports = router;
