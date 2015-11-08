'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('groups.organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    groups: user.groups.organizerOf
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('groups.organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var group = user.groups.organizerOf.filter(function(item) {
                    return item._id == req.params.groupId;
                });

                res.json({
                    group: group
                });
            }
        });
};


exports.create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
    		groups: {
            	organizerOf: req.params.groupId
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
            	organizerOf: req.params.groupId
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