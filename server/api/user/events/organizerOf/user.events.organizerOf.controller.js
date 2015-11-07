'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    events: user.organizerOf
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var event = user.organizerOf.filter(function(item) {
                    return item == req.params.eventId;
                });

                res.json({
                    event: event
                });
            }
        });
};


exports.create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
            organizerOf: req.params.eventId
        }
    }, function(err, user) {
        if (err) {
            handleError(res, err);
        } else {
            res.status(200).end();
        }
    });
};


exports.destroy = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $remove: {
            organizerOf: req.params.eventId
        }
    }, function(err, user) {
        if (err) {
            handleError(res, err);
        } else {
            res.status(200).end();
        }
    });
};


function handleError(res, err) {
    res.status(500).send(err);
};