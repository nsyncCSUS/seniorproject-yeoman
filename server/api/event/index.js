'use strict';

var express = require('express');
var controller = require('./event.controller');
var organizers = require('./organizers/event.organizers.index');
var volunteers = require('./volunteers/event.volunteers.index');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.use('/organizers', organizers);
router.use('/volunteers', volunteers);

module.exports = router;