'use strict';

var User = require('../../user.model');
var Group = require('../../../group/group.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.volunteeredTo')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                return res.json(user.groups.volunteeredTo);
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.groupId)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.volunteeredTo')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                var groups = user.groups.volunteeredTo.filter(function(item) {
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
            'groups.volunteeredTo': req.params.groupId
        }
    }, {
        new: true
    }).populate('groups.volunteeredTo').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return notFound(res);
        } else {
            return Group.findByIdAndUpdate(req.params.groupId, {
                $push: {
                    volunteers: req.params.id
                }
            }, function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return notFound(res);
                } else {
                    return res.status(200).send(user.groups.volunteeredTo);
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
            'groups.volunteeredTo': req.params.groupId
        }
    }, {
        new: true
    }).populate('groups.volunteeredTo').exec(function(err, user) {
        if (err) {
            return handleError(res, err);
        } else if(!user) {
            return notFound(res);
        } else {
            return Group.findByIdAndUpdate(req.params.groupId, {
                $pull: {
                    volunteers: req.params.id
                }
            }, function(err, group) {
                if (err) {
                    return handleError(res, err);
                } else if(!group) {
                    return notFound(res);
                } else {
                    return res.status(200).send(user.groups.volunteeredTo);
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
