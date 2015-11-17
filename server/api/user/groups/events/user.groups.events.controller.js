'use strict';

var Event = require('../../../event/event.model');
var Group = require('../../../group/group.model');
var User = require('../../user.model');

exports.create = function(req, res) {
    if (!validId(req.params.id)) {
        return notFound(res);
    }

    var params = req.body.event;
    params.creationUser = req.params.id;
    params.group = req.params.groupId;
    return Event.create(params, function(err, event) {
        if (err) {
            return handleError(res, err);
        } else if(!event) {
            return notFound(res);
        } else {
            return User.findByIdAndUpdate(req.params.id, {
                $push: {
                    'events.creatorOf': req.params.eventId,
                    'events.organizerOf': req.params.eventId
                }
            }, function(err, user) {
                if (err) {
                    return handleError(res, err);
                } else if(!user) {
                    return notFound(res);
                } else {
                    return Group.findByIdAndUpdate(req.params.groupId, {
                        $push: {
                            'events': req.params.event
                        }
                    }, function(err, group) {
                        if (err) {
                            return handleError(res, err);
                        } else if(!group) {
                            return notFound(res);
                        } else {
                            return res.status(200).send({
                                event: event
                            });
                        }
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
    return res.status(404).send('Not Found');
}

function validId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}
