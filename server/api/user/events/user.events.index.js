'use strict';

var creatorOf = require('./creatorOf/user.events.creatorOf.index');
var organizerOf = require('./organizerOf/user.events.organizerOf.index');
var volunteeredTo = require('./organizerOf/user.events.volunteeredTo.index');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.use('/creatorOf', creatorOf);
router.use('/organizerOf', organizerOf);
router.use('/volunteeredTo', volutneeredTo);

module.exports = router;
