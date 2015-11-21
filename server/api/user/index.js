'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var events = require('./events/user.events.index');
var groups = require('./groups/user.groups.index');

var router = express.Router();

//router.get('/', auth.hasRole('admin'), controller.index);
//router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//router.get('/', auth.isAuthenticated(), controller.index);
//router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/me', auth.isAuthenticated(), controller.me);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/', controller.index);
router.delete('/:id', controller.destroy);
//router.get('/me', controller.me);
router.put('/:id/password', controller.changePassword);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.get('/:id', controller.show);
router.post('/', controller.create);

router.use('/:id/events', events);
router.use('/:id/groups', groups);

module.exports = router;
