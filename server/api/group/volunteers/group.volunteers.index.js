'use strict';

var controller = require('./group.volunteers.controller');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:volunteerId', controller.show);
router.post('/', controller.create);
router.delete('/:volunteerId', controller.destroy);

module.exports = router;
