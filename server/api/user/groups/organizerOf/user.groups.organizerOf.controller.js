'use strict';

var User = require('../../user.model');


var index = function(req, res) {
    User.findById(req.params.id)
        .populate('organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    groups: user.organizerOf
                });
            }
        });
};


var show = function(req, res) {
    User.findById(req.params.id)
        .populate('organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var group = user.organizerOf.filter(function(item) {
                    return item._id == req.params.groupId;
                });

                res.json({
                    group: group
                });
            }
        });
};


var create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
            organizerOf: req.params.groupId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
            res.status(200).end();
        }
    });
};


var destroy = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $remove: {
            organizerOf: req.params.groupId
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