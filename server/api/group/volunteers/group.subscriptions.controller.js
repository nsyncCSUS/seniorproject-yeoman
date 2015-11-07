'use strict';

var Group = require('./group.model');

exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('subscriptions')
        .exec(function(err, group) {
            res.json(group);
        });
};

exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('subscriptions')
        .exec(function(err, group) {
            if(err) {
                res.send(err);
            } else {
                var users = group.subscriptions.filter(function(index, item) {
                    return item._id == req.params.userId;
                });
                
                res.json(users[0]);
            }
        });
};

exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {$push: {subscriptions: req.params.userId}}, function(err) {
        if(err) {
            res.send(err);
        }
    });
};

exports.destroy = function(req, res) {
    // ...
};


