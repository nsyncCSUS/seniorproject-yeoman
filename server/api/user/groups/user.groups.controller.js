'use strict';

var User = require('../user.model');
var Group = require('../../group/group.model');


exports.create = function(req, res) {
    if (!ValidId(req.params.id)) {
        return NotFound(res);
    }

    var params = req.body.group;
    params.creationUser = req.params.id;
    return Group.create(params, function(err, group) {
        if (err) {
            return handleError(res, err);
        } else if (!group) {
            return NotFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.id, {
                $push: {
                    'groups.creatorOf': group._id,
                    'groups.organizerOf': group._id
                }
            }, function(err, user) {
                if (err) {
                    return handleError(res, err);
                } else if() {
                    return NotFound(res);
                } else {
                    return res.status(200).send(group);
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
