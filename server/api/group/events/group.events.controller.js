'use strict';

var Group = require('../group.model');


exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('events')
        .exec(function(err, groups) {
            res.json({
                events: groups.events
            });
        });
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('events')
        .exec(function(err, group) {
            if (err) {
                handleError(res, err);
            } else {
                var events = group.events.filter(function(index, item) {
                    return item._id == req.params.eventId;
                });

                res.json({
                    events: events
                })[0];
            }
        });
};


exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            events: req.params.eventId
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
    Group.findByIdAndUpdate(req.params.id, {
        $remove: {
            events: req.params.eventId
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
}