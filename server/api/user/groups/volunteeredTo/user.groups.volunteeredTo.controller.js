'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('groups.subscribedTo')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    groups: user.groups.subscribedTo
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('groups.subscribedTo')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var group = user.groups.subscribedTo.filter(function(item) {
                    return item._id == req.params.groupId;
                });

                res.json({
                    group: group[0]
                });
            }
        });
};


exports.create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
    		groups: {
            	subscribedTo: req.params.groupId
    		}
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
    		groups: {
            	subscribedTo: req.params.groupId
    		}
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