'use strict';

var controller = require('./group.organizers.controller.js');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:organizerId', controller.show);
router.post('/:organizerId', controller.create);
router.delete('/:organizerId', controller.destroy);

module.exports = router;
