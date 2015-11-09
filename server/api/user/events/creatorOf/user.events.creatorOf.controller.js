'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
	User.findById(req.params.id)
		.populate('events.creatorOf')
		.exec(function(err, user) {
			if(err || !user) {
				handleError(res, err);
			} else {
				res.json({
					events: user.events.creatorOf
				});
			}
		});
};


exports.show = function(req, res) {
	User.findById(req.params.id)
		.populate('events.creatorOf')
		.exec(function(err, user) {
			if(err || !user) {
				handleError(res, err);
			} else {
				var events = user.events.creatorOf.filter(function(item) {
					return item._id == req.params.eventId;
				});
				
				res.json({
					event: events[0]
				});
			}
		});
};


function handleError(res, err) {
	res.status(500).send(err);
};

