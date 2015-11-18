'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('events.creatorOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                res.json(user.events.creatorOf);
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('events.creatorOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                var events = user.events.creatorOf.filter(function(item) {
                    return item._id.toString() === req.params.eventId;
                });

                if(events.length === 0) {
                    return notFound(res);
                } else {
                    return res.json({
                        event: events.pop()
                    });
                }
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
