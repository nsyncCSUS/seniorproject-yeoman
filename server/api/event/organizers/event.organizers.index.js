'use strict';

var controller = require('./event.organizers.controller');
var auth = require('../../../auth/auth.service');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.get('/', controller.index);
router.get('/:organizerId', controller.show);
//router.post('/:organizerId', auth.isAuthenticated(), controller.create);
//router.delete('/:organizerId', auth.isAuthenticated(), controller.destroy);
router.post('/:organizerId', controller.create);
router.delete('/:organizerId', controller.destroy);


module.exports = router;
