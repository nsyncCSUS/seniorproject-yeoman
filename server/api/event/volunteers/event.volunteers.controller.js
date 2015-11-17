'use strict';

var Event = require('../event.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err) {
                return handleError(res, err);
            } else if(!event) {
                return notFound(res);
            } else {
                return res.json({
                    volunteers: event.volunteers.map(function(user) {
                        return user.profile;
                    })
                });
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err) {
                return handleError(res, err);
            } else if(!event) {
                return notFound(res);
            } else {
                var volunteer = event.volunteers.filter(function(item) {
                    return item._id === req.params.volunteerId;
                }).map(function(user) {
                    return user.profile;
                }).pop();

                return res.json({
                    volunteer: volunteer
                });
            }
        });
};


exports.create = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Event.findByIdAndUpdate(req.params.id, {
        $push: {
            volunteers: req.params.volunteerId
        }
    }).populate('volunteers').exec(function(err, event) {
        if (err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.volunteerId, {
                $push: {
                    'events.volunteeredTo': req.params.id
                }
            }, function(err, user) {
                if (err) {
                    return handleError(res, err);
                } else if(!user) {
                    return notFound(res);
                } else {
                    return res.status(200).send({
                        volunteers: event.volunteers.map(function(item) {
                            return item.profile;
                        })
                    });
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Event.findByIdAndUpdate(req.params.id, {
        $pull: {
            volunteers: req.params.volunteerId
        }
    }).populate('volunteers').exec(function(err, event) {
        if (err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.volunteerId, {
                $pull: {
                    'event.volunteeredTo': req.params.id
                }
            }, function(err, volunteer) {
                if (err) {
                    return handleError(res, err);
                } else if(!volunteer) {
                    return notFound(res);
                } else {
                    return res.status(200).send({
                        volunteers: event.volunteers.map(function(item) {
                            return item.profile;
                        })
                    });
                }
            });
        }
    });
};


function handleError(res, err) {
    res.status(500).send(err);
}

function notFound(res) {
    res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(new RegExp(/^[0-9a-fA-F]{24}$/));
}
