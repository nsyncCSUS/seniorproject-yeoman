'use strict';

var controller = require('./event.volunteers.controller');
var auth = require('../../../auth/auth.service');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:volunteerId', controller.show);
router.post('/:volunteerId', auth.isAuthenticated(), controller.create);
router.delete('/:volunteerId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
