'use strict';

var creatorOf = require('./creatorOf/user.groups.creatorOf.index');
var organizerOf = require('./organizerOf/user.groups.organizerOf.index');
var volunteeredTo = require('./volunteeredTo/user.groups.volunteeredTo.index');
var express = require('express');
var router = express.Router({
	mergeParams: true
});

router.use('/creatorOf', creatorOf);
router.use('/organizerOf', organizerOf);
router.use('/volunteeredTo', volunteeredTo);

module.exports = router;
