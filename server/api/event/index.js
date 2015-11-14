'use strict';

var express = require('express');
var controller = require('./event.controller');
var organizers = require('./organizers/event.organizers.index');
var volunteers = require('./volunteers/event.volunteers.index');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id', controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
//router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.delete('/:id', controller.destroy);

router.use('/:id/organizers', organizers);
router.use('/:id/volunteers', volunteers);

module.exports = router;
