'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.creatorOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                return res.json(user.groups.creatorOf);
            }
        })
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.groupId)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                var group = user.groups.creatorOf.filter(function(item) {
                    return item._id === req.params.eventId;
                }).pop();

                return res.json({
                    group: group
                });
            }
        });
};


function handleError(res, err) {
    res.status(500).send(err);
}

function notFound(res) {
    return res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}
