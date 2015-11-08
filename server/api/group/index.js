'use strict';

var express = require('express');
var controller = require('./group.controller');
var events = require('./events/group.events.index');
var organizers = require('./organizers/group.organizers.index');
var volunteers = require('./volunteers/group.volunteers.index');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.use('/:id/events', events);
router.use('/:id/organizers', organizers);
router.use('/:id/volunteers', volunteers);

module.exports = router;