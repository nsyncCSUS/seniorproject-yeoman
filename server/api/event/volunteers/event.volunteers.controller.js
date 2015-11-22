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
                return res.json(event.volunteers.map(function(user) {
                    return user.profile;
                }));
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
                var volunteers = event.volunteers.filter(function(item) {
                    return item._id.toString() === req.params.volunteerId;
                }).map(function(user) {
                    return user.profile;
                });

                if(volunteers.length === 0) {
                    return notFound(res);
                } else {
                    return res.json({
                        volunteer: volunteers[0]
                    });
                }
            }
        });
};


exports.create = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Event.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            volunteers: req.params.volunteerId
        }
    }, {
        new: true
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
                    return res.status(200).send(event.volunteers.map(function(item) {
                        return item.profile;
                    }));
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
    }, {
        new: true
    }).populate('volunteers').exec(function(err, event) {
        if (err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.volunteerId, {
                $pull: {
                    'events.volunteeredTo': req.params.id
                }
            }, function(err, volunteer) {
                if (err) {
                    return handleError(res, err);
                } else if(!volunteer) {
                    return notFound(res);
                } else {
                    return res.status(200).send(event.volunteers.map(function(item) {
                        return item.profile;
                    }));
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
