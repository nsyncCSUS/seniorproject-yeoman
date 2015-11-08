'use strict';

var express = require('express');
var controller = require('./group.controller');
var events = require('./events/group.events.index');
var organizers = require('./organizers/group.organizers.index');
var volunteers = require('./volunteers/group.volunteers.index');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.use('/:id/events', events);
router.use('/:id/organizers', organizers);
router.use('/:id/volunteers', volunteers);

module.exports = router;