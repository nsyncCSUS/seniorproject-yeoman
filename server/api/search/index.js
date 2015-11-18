'use strict'

var express = require('express');
var controller = require('./search.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id', controller.show);




module.exports = router;
