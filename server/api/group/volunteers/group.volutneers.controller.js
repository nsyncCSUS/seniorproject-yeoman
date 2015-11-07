'use strict';

var Group = require('./group.model');


exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            res.json(group);
        });
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            if (err) {
                handleError(err, res);
            } else {
                var subscription = group.subscriptions.filter(function(index, item) {
                    return item._id == req.params.userId;
                });

                res.json({
                    subscription: subscriptions[0]
                });
            }
        });
};


exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            subscriptions: req.params.userId
        }
    }, function(err) {
        if (err) {
            handleError(err, res);
        } else {
            res.status(200).end();
        }
    });
};


exports.destroy = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $remove: {
            subscriptions: req.params.userId
        }
    }, function(err) {
        if (err) {
            handleError(err, res);
        } else {
            res.status(200).end();
        }
    });
};


function handleError(err, res) {
    res.status(500).send(err);
};