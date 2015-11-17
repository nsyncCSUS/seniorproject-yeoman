'use strict';

var _ = require('lodash');
var Event = require('../event.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return Event.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, event) {
            if (err) {
                return handleError(res, err);
            } else if(!event) {
                return notFound(res);
            } else {
                return res.status(200).json({
                    organizers: event.organizers.map(function(user) {
                        return user.profile;
                    })
                });
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.organizerId)) {
        return notFound(res);
    }

    return Event.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, event) {
            if (err) {
                return handleError(res, err);
            } else if(!event) {
                return notFound(res);
            } else {
                var organizer = event.organizers.filter(function(item) {
                    return item._id === req.params.organizerId;
                }).map(function(user) {
                    return user.profile;
                }).pop();

                return res.status(200).json({
                    organizer: organizer
                });
            }
        });
};


exports.create = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.organizerId)) {
        return notFound(res);
    }

    return Event.findByIdAndUpdate(req.params.id, {
        $push: {
            organizers: req.params.organizerId
        }
    }).populate('organizers').exec(function(err, event) {
        if (err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.organizerId, {
                $push: {
                    'events.organizerOf': req.params.id
                }
            }, function(err, user) {
                if (err) {
                    return handleError(res, err);
                } else if(!event) {
                    return notFound(res);
                } else {
                    return res.status(200).json({
                        organizers: event.organizers.map(function(item) {
                            return item.profile;
                        })
                    });
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.organizerId)) {
        return notFound(res);
    }

    return Event.findByIdAndUpdate(req.params.id, {
        $pull: {
            organizers: req.params.organizerId
        }
    }).populate('organizers').exec(function(err, event) {
        if (err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.organizerId, {
                $pull: {
                    'events.organizerOf': req.params.id
                }
            }, function(err, user) {
                if (err) {
                    return handleError(res, err);
                } else if(!user) {
                    return notFound(res);
                } else {
                    return res.status(200).json({
                        organizers: event.organizers.map(function(item) {
                            return item.profile;
                        })
                    });
                }
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
    return id.match(new RegExp(/^[0-9a-fA-F]{24}$/));
}
