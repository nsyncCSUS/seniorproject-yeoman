'use strict';

var Event = require('../event.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    if (!ValidId(req.params.id)) {
        return NotFound(res);
    }
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err || !event) {
                handleError(res, err);
            } else {
                res.json({
                    volunteers: event.volunteers.map(function(user) {
                        return user.profile;
                    });
                });
            }
        });
};


exports.show = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.volunteerId)) {
        return NotFound(res);
    }
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err || !event) {
                handleError(res, err);
            } else {
                var volunteer = event.volunteers.filter(function(item) {
                    return item._id == req.params.volunteerId;
                }).map(function(user) {
                    return user.profile;
                }).pop();

                res.json({
                    volunteer: volunteer
                });
            }
        });
};


exports.create = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.volunteerId)) {
        return NotFound(res);
    }
    Event.findByIdAndUpdate(req.params.id, {
        $push: {
            volunteers: req.params.volunteerId
        }
    }).populate('volunteers').exec(function(err, event) {
        if (err || !event) {
            handleError(res, err);
        } else {
            User.findByIdAndUpdate(req.params.volunteerId, {
                $push: {
                    'events.volunteeredTo': req.params.id
                }
            }, function(err, user) {
                if (err || !user) {
                    handleError(res, err);
                } else {
                    res.status(200).send({
                        volunteers: event.volunteers.map(function(item) {
                            return item.profile;
                        });
                    });
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.volunteerId)) {
        return NotFound(res);
    }
    Event.findByIdAndUpdate(req.params.id, {
        $pull: {
            volunteers: req.params.volunteerId
        }
    }).populate('volunteers').exec(function(err, event) {
        if (err) {
            handleError(res, err);
        } else {
            // Remove event from volunteer's event list
            User.findByIdAndUpdate(req.params.volunteerId, {
                $pull: {
                    'event.volunteeredTo': req.params.id
                }
            }, function(err, volunteer) {
                if (err) {
                    handleError(res, err);
                } else {
                    res.status(200).send({
                        volunteers: event.volunteers.map(function(item) {
                            return item.profile;
                        });
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
    res.status(404).send('Not Found');
};

function ValidId(id) {
    return id.match(new RegExp(/^[0-9a-fA-F]{24}$/));
};
