'use strict';

var User = require('../../user.model');
var Event = require('../../../event/event.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if (!user) {
                return notFound(res);
            } else {
                return res.json(user.events.organizerOf);
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if (!user) {
                return notFound(res);
            } else {
                var events = user.events.organizerOf.filter(function(item) {
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
    if (!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    return User.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            'events.organizerOf': req.params.eventId
        }
    }, {
        new: true
    }).populate('events.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if (!user) {
            return notFound(res);
        } else {
            return Event.findByIdAndUpdate(req.params.eventId, {
                $push: {
                    organizers: req.params.id
                }
            }, function(err, event) {
                if (err) {
                    return handleError(res, err);
                } else if(!event) {
                    return notFound(res);
                } else {
                    return res.status(200).send(user.events.organizerOf);
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.eventId)) {
        return notFound(res);
    }

    return User.findByIdAndUpdate(req.params.id, {
        $pull: {
            'events.organizerOf': req.params.eventId
        }
    }, {
        new: true
    }).populate('events.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return notFound(res);
        } else {
            return Event.findByIdAndUpdate(req.params.eventId, {
                $pull: {
                    organizers: req.params.id
                }
            }, function(err, event) {
                if (err) {
                    return handleError(res, err);
                } else if(!event) {
                    return notFound(res);
                } else {
                    return res.status(200).send(user.events.organizerOf);
                }
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
