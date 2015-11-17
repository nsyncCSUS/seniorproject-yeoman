'use strict';

var User = require('../../user.model');
var Group = require('../../../group/group.model');


exports.index = function(req, res) {
    if (!ValidId(req.params.id)) {
        return NotFound(res);
    }

    User.findById(req.params.id)
        .populate('groups.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if (!user) {
                return NotFound(res);
            } else {
                return res.status(200).json(user.groups.organizerOf);
            }
        });
};


exports.show = function(req, res) {
    if (!ValidId(req.params.id) || !ValidId(req.params.eventId)) {
        return NotFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else if (!user) {
                return NotFound(res);
            } else {
                var group = user.groups.organizerOf.filter(function(item) {
                    return item._id == req.params.groupId;
                }).pop();

                return res.json({
                    group: group
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
            'groups.organizerOf': req.params.groupId
        }
    }).populate('groups.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return NotFound(res);
        } else {
            return Group.findByIdAndUpdate(req.params.groupId, {
                $push: {
                    organizers: req.params.id
                }
            }, function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return NotFound(res);
                } else {
                    res.status(200).send({
                        groups: user.groups.organizerOf
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

    User.findByIdAndUpdate(req.params.id, {
        $pull: {
            'groups.organizerOf': req.params.groupId
        }
    }).populate('groups.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return NotFound(res);
        } else {
            return Group.findByIdAndUpdate(req.params.groupId, {
                $pull: {
                    organizers: req.params.id
                }
            }, function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return NotFound(res);
                } else {
                    return res.status(200).send({
                        groups: user.groups.organizerOf
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
