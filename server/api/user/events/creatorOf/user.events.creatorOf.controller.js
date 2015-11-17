'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    if (!ValidId(req.params.id)) {
        return NotFound(res);
    }
    User.findById(req.params.id)
        .populate('events.creatorOf')
        .exec(function(err, user) {
            if (err || !user) {
                handleError(res, err);
            } else {
                res.json(user.events.creatorOf);
            }
        });
};


exports.show = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.eventId)) {
        return NotFound(res);
    }
    User.findById(req.params.id)
        .populate('events.creatorOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return NotFound(res);
            } else {
                var event = user.events.creatorOf.filter(function(item) {
                    return item._id == req.params.eventId;
                }).pop();

                return res.json({
                    event: event
                });
            }
        });
};


function handleError(res, err) {
    res.status(500).send(err);
};

function NotFound(res) {
    return res.status(404).send('Not Found');
};

function ValidId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
};
