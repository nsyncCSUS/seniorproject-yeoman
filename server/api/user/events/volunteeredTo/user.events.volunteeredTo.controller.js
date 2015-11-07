'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('volunteeredTo')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    events: user.volunteeredTo
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('volunteeredTo')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var event = user.volunteeredTo.filter(function(item) {
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
            volunteeredTo: req.params.eventId
        }
    }, function(err) {
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
            volunteeredTo: req.params.eventId
        }
    }, function(err) {
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