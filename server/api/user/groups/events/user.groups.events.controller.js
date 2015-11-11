'use strict';

var Event = require('../../../event/event.model');
var Group = require('../../../group/group.model');
var User = require('../../user.model');

exports.create = function(req, res) {
	var params = req.body.event;
	params.creationUser = req.params.id;
	params.group = req.params.groupId;
	Event.create(params, function(err, event) {
		if(err) {
			handleError(res, err);
		} else {
			
			User.findByIdAndUpdate(req.params.id, {
				$push: {
					'events.creatorOf': req.params.eventId,
					'events.organizerOf': req.params.eventId
				}
			}, function(err) {
				if(err) {
					handleError(res, err);
				} else {
					
					Group.findByIdAndUpdate(req.params.groupId, {
						$push: {
							'events': req.params.event
						}
					}, function(err) {
						if(err) {
							handleError(res, err);
						} else {
							res.status(200).send('success');
						}
					});
				}
			});
		}
	});
};


function handleError(res, err) {
	res.status(500).send(err);
};
