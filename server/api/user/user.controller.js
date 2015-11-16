'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
    return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.status(500).send(err);

        // return user profile
        var _users = users.map(function(user) {
        	return user.profile;
        });

        res.status(200).json(_users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;
    if(!ValidId(userId)) {
        return NotFound(res);
    }

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json({
        	user: user.profile
        });
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.status(500).send(err);
        return res.status(204).send('No Content');
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);
    if(!ValidId(userId)) {
        return NotFound(res);
    }

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.status(200).send('OK');
            });
        } else {
            res.status(403).send('Forbidden');
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    if(!ValidId(userId)) {
        return NotFound(res);
    }
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json({
        	user: user
        });
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

function NotFound(res) {
    return res.status(404).send('Not Found');
};

function ValidId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
};

