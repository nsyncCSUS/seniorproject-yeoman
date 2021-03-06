'use strict';

var User = require('../../user.model');
var Group = require('../../../group/group.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.organizerOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if (!user) {
                return notFound(res);
            } else {
                return res.status(200).json(user.groups.organizerOf);
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.groupId)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else if (!user) {
                return notFound(res);
            } else {
                var groups = user.groups.organizerOf.filter(function(item) {
                    return item._id.toString() === req.params.groupId;
                });

                if(groups.length === 0) {
                    return notFound(res);
                } else {
                    return res.json({
                        group: groups.pop()
                    });
                }
            }
        });
};


exports.create = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.groupId)) {
        return notFound(res);
    }

    return User.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            'groups.organizerOf': req.params.groupId
        }
    }, {
        new: true
    }).populate('groups.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return notFound(res);
        } else {
            return Group.findByIdAndUpdate(req.params.groupId, {
                $push: {
                    organizers: req.params.id
                }
            }, function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return notFound(res);
                } else {
                    return res.status(200).send(user.groups.organizerOf);
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.groupId)) {
        return notFound(res);
    }

    return User.findByIdAndUpdate(req.params.id, {
        $pull: {
            'groups.organizerOf': req.params.groupId
        }
    }, {
        new: true
    }).populate('groups.organizerOf').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return notFound(res);
        } else {
            return Group.findByIdAndUpdate(req.params.groupId, {
                $pull: {
                    organizers: req.params.id
                }
            }, function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return notFound(res);
                } else {
                    return res.status(200).send(user.groups.organizerOf);
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
