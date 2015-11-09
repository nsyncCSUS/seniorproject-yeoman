'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
    return res.status(422).json(err);
}

/**
 * Collection of nested routes for accessing events
 */


exports.create = function(req, res, next) {
    var userId = req.params.userId;
    var eventId = req.body.eventId;
    User.findByIdAndUpdate(userId, {
        $push: {
            volunteeredTo: eventId
        }
    }, function(err) {
        if (err) {
            res.send(err);
        }
    });
};


/**
 * Send list of volunteered events
 */
exports.show = function(req, res, next) {
    var userId = req.params.userId;
    User.findById(userId).
    populate('volunteeredTo').
    exec(function(err, user) {
        res.json(user);
    });
};