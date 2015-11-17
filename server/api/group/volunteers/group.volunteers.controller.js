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
                return res.json({
                    volunteers: group.volunteers.map(function(user) {
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

    return Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            if (err) {
                return handleError(err, res);
            } else if (!group) {
                return notFound(res);
            }else {
                var volunteer = group.volunteers.filter(function(item) {
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

    return Group.findByIdAndUpdate(req.params.id, {
        $push: {
            volunteers: req.params.volunteerId
        }
    }).populate('volunteers').exec(function(err, group) {
        if (err) {
            return handleError(err, res);
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
                    return res.status(200).send({
                        volunteers: group.volunteers
                    });
                }
            });
        }
    });
};


exports.destroy = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.VolunteerId)) {
        return notFound(res);
    }

    return Group.findByIdAndUpdate(req.params.id, {
        $pull: {
            volunteers: req.params.volunteerId
        }
    }).populate('volunteers').exec(function(err, group) {
        if (err) {
            return handleError(err, res);
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
                    return res.status(200).send({
                        volunteers: group.volunteers
                    });
                }
            });
        }
    });
};


function handleError(err, res) {
    return res.status(500).send(err);
}

function notFound(res) {
    return res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}
