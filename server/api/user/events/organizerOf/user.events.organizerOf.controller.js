'use strict';

var User = require('../../user.model');
var Event = require('../../../event/event.model');


exports.index = function(req, res) {
    if (!ValidId(req.params.id)) {
        return NotFound(res);
    }
    User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if (!user) {
                return NotFound(res);
            } else {
                return res.json(user.events.organizerOf);
            }
        });
};


exports.show = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.eventId)) {
        return NotFound(res);
    }
    User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if (!user) {
                return NotFound(res);
            } else {
                var event = user.events.organizerOf.filter(function(item) {
                    return item._id == req.params.eventId;
                }).pop();

                return res.json({
                    event: event
                });
            }
        });
};


exports.create = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.eventId)) {
        return NotFound(res);
    }

    return User.findByIdAndUpdate(req.params.id, {
        $push: {
            'events.organizerOf': req.params.eventId
        }
    }).populate('events.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if (!user) {
            return NotFound(res);
        } else {
            return Event.findByIdAndUpdate(req.params.eventId, {
                $push: {
                    organizers: req.params.id
                }
            }, function(err, event) {
                if (err) {
                    return handleError(res, err);
                } else if(!event) {
                    return NotFound(res);
                } else {
                    return res.status(200).send({
                        events: user.events.organizerOf
                    });
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.eventId)) {
        return NotFound(res);
    }

    return User.findByIdAndUpdate(req.params.id, {
        $pull: {
            'events.organizerOf': req.params.eventId
        }
    }).populate('events.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return NotFound(res);
        } else {
            return Event.findByIdAndUpdate(req.params.eventId, {
                $pull: {
                    organizers: req.params.id
                }
            }, function(err, event) {
                if (err) {
                    return handleError(res, err);
                } else if(!event) {
                    return NotFound(res);
                } else {
                    return res.status(200).send({
                        events: user.events.organizerOf
                    });
                }
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
