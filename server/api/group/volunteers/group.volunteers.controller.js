'use strict';

var Group = require('../group.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            if (err) {
                return handleError(res, err);
            } else if(!group) {
                return notFound(res);
            } else {
                return res.json(group.volunteers.map(function(user) {
                    return user.profile;
                }));
            }
        });
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            if (err) {
                return handleError(res, err);
            } else if (!group) {
                return notFound(res);
            } else {
                var volunteers = group.volunteers.filter(function(item) {
                    return item._id.toString() === req.params.volunteerId;
                }).map(function(user) {
                    return user.profile;
                });

                if(volunteers.length === 0) {
                    return notFound(res);
                } else {
                    return res.json({
                        volunteer: volunteers.pop()
                    });
                }
            }
        });
};


exports.create = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Group.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            volunteers: req.params.volunteerId
        }
    }, {
        new: true
    }).populate('volunteers').exec(function(err, group) {
        if (err) {
            return handleError(res, err);
        } else if (!group) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.volunteerId, {
                $push: {
                    'groups.volunteeredTo': req.params.id
                }
            }, function(err, volunteer) {
                if (err) {
                    return handleError(res, err);
                } else if(!volunteer) {
                    return notFound(res);
                } else {
                    return res.status(200).send(group.volunteers);
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.volunteerId)) {
        return notFound(res);
    }

    return Group.findByIdAndUpdate(req.params.id, {
        $pull: {
            volunteers: req.params.volunteerId
        }
    }, {
        new: true
    }).populate('volunteers').exec(function(err, group) {
        if (err) {
            return handleError(res, err);
        } else if(!group) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.volunteerId, {
                $pull: {
                    'groups.organizerOf': req.params.id
                }
            }, function(err, volunteer) {
                if (err) {
                    return handleError(res, err);
                } else if(!volunteer) {
                    return notFound(res);
                } else {
                    return res.status(200).send(group.volunteers);
                }
            });
        }
    });
};


function handleError(res, err) {
    console.log("Error: ", err);
    return res.status(500).send(err);
}

function notFound(res) {
    return res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}
