'use strict';

var Group = require('../group.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err) {
                return handleError(res, err);
            } else if(!group){
                return notFound(res);
            } else {
                return res.json({
                    organizers: group.organizers.map(function(user) {
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

    return Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err) {
                return handleError(res, err);
            } else if(!group) {
                return notFound(res);
            } else {
                var organizer = group.organizers.filter(function(item) {
                    return item._id === req.params.organizerId;
                }).map(function(user) {
                    return user.profile;
                }).pop();

                return res.json({
                    organizer: organizer
                });
            }
        });
};



exports.create = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.organizerId)) {
        return notFound(res);
    }

    return Group.findByIdAndUpdate(req.params.id, {
        $push: {
            organizers: req.params.organizerId
        }
    }).populate('organizers').exec(function(err, group) {
        if (err) {
            return handleError(res, err);
        } else if(!group) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.organizerId, {
                $push: {
                    'groups.organizerOf': req.params.id
                }
            }, function(err, organizer) {
                if (err) {
                    return handleError(res, err);
                } else if(!organizer) {
                    return notFound(res);
                } else {
                    return res.status(200).send({
                        organizers: group.organizers
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

    return Group.findByIdAndUpdate(req.params.id, {
        $pull: {
            organizers: req.params.organizerId
        }
    }).populate('organizers').exec(function(err, group) {
        if (err) {
            return handleError(res, err);
        } else if(!group) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.organizerId, {
                $pull: {
                    'groups.organizerOf': req.params.id
                }
            }, function(err, organizer) {
                if (err) {
                    return handleError(res, err);
                } else if(!organizer) {
                    return notFound(res);
                } else {
                    return res.status(200).send({
                        organizers: group.organizers
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
    return id.match(/^[0-9a-fA-F]{24}$/);
}
