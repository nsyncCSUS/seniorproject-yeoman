'use strict';

var _ = require('lodash');
var Event = require('../event.model');
var User = require('../../user/user.model');

exports.index = function(req, res) {};
exports.show = function(req, res) {};
exports.create = function(req, res) {};
exports.update = function(req, res) {};
exports.destroy = function(req, res) {};

function handleError(res, err) {
    return res.status(500).send(err);
};
