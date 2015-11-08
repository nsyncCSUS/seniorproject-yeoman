'use strict';

var controller = require('./group.events.controller');
var auth = require('../../../auth/auth.service');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/:eventId', auth.isAuthenticated(), controller.create);
router.delete('/:eventId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
