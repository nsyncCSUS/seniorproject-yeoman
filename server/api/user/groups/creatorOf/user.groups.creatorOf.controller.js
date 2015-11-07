'use strict';

var User = require('../../../user.model');


var index = function(req, res) {
	User.findById(req.params.id)
		.populate('groups.creatorOf')
		.exec(function(err, user) {
			if(err) {
				handleError(res, err);
			} else {
				res.json({
					events: user.events.creatorOf
				});
			}
		})
};


var show = function(req, res) {
	User.findById(req.params.id)
		.populate('events.organizerOf')
		.exec(function(err, user) {
			if(err) {
				handleError(res, err);
			} else {
				var event = user.events.creatorOf.filter(function(item) {
					return item._id == req.params.eventId;
				});
				
				res.json({
					event: event
				});
			}
		});
};


function handleError(res, err) {
	res.status(500).send(err);
};

