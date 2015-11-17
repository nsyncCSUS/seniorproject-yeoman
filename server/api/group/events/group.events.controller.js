'use strict';

var Group = require('../group.model');
var Event = require('../../event/event.model');


exports.index = function(req, res) {
    if(!validId(req.params.id)) {
        return notFound(res);
    }

    Group.findById(req.params.id)
        .populate('events')
        .exec(function(err, group) {
            if(err) {
                return handleError(res, err);
            } else if(!group) {
                return notFound(res);
            } else {
                return res.json({
                    events: group.events
                });
            }
        });
};


exports.show = function(req, res) {
    if(!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    Group.findById(req.params.id)
        .populate('events')
        .exec(function(err, group) {
            if (err) {
                return handleError(res, err);
            } else if(!group) {
                return notFound(res);
            } else {
                var event = group.events.filter(function(index, item) {
                    return item._id === req.params.eventId;
                }).pop();

                return res.json({
                    events: event
                });
            }
        });
};



/**
 * Delete an event: To do this we must delete
 * the event and remove it from the group's
 * event list.
 */
exports.destroy = function(req, res) {
    if(!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    return Group.findByIdAndUpdate(req.params.id, {
        $pull: {
            events: req.params.eventId
        }
    }).populate('events').exec(function(err, group) {
        if (err) {
            return handleError(res, err);
        } else if(!group) {
            return notFound(res);
        } else {
            return res.status(200).send({
                events: group.events
            });
        }
    });
};


function handleError(res, err) {
    return res.status(500).send(err);
}

function notFound(res) {
    return res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}
