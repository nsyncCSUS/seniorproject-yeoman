'use strict';

var Group = require('../group.model');
var Event = require('../../event/event.model');
var User = require('../../user/user.model');


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
                return res.json(group.events);
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
                var events = group.events.filter(function(item) {
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


exports.create = function(req, res) {
    if(!validId(req.params.id)) {
        return notFound(res);
    }

    var user = req.user;
    var params = req.body;
    if(params._id) delete params._id;
    params.creationUser = user._id;
    params.organizers.push(user._id);

    return Group.findById(req.params.id, function(err, group) {
        if(err) {
            return handleError(res, err);
        } else if(!group) {
            return notFound(res);
        }

        return Event.create(params, function(err, event) {
            if(err) {
                return handleError(res, err);
            }

            return Group.findByIdAndUpdate(req.params.id, {
                $addToSet: {
                    'events': event._id,
                }
            }, function(err, group) {
                if(err) {
                    return handleError(res, err);
                }

                return User.findByIdAndUpdate(user._id, {
                    $addToSet: {
                        'events.organizerOf': event._id,
                        'events.creatorOf': event._id
                    }
                }, function(err, user) {
                    if(err) return handleError(res, err);
                    return res.status(201).json({
                        event: event
                    });
                });
            });
        });
    })
}



/**
 * Delete an event: To do this we must delete
 * the event and remove it from the group's
 * event list.
 */
exports.destroy = function(req, res) {
    if(!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    return Event.findById(req.params.eventId, function(err, event) {
        if(err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        }

        event.remove(function() {
            if(err) {
                return handleError(res, err);
            }

            return Group.findByIdAndUpdate(req.params.id, {
                $pull: {
                    events: req.params.eventId
                }
            }, {
                new: true
            }).populate('events').exec(function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return notFound(res);
                } else {
                    return res.status(200).send(group.events);
                }
            });
        });
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
