'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.creatorOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                return res.json(user.groups.creatorOf);
            }
        })
};


exports.show = function(req, res) {
    if (!validId(req.params.id) || !validId(req.params.groupId)) {
        return notFound(res);
    }

    return User.findById(req.params.id)
        .populate('groups.creatorOf')
        .exec(function(err, user) {
            if (err) {
                return handleError(res, err);
            } else if(!user) {
                return notFound(res);
            } else {
                var groups = user.groups.creatorOf.filter(function(item) {
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


function handleError(res, err) {
    res.status(500).send(err);
}

function notFound(res) {
    return res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}
