'use strict';

var User = require('../../user.model');


exports.index = function(req, res) {
  if(!ValidId(req.params.id)) {
      return NotFound(res);
  }
	User.findById(req.params.id)
		.populate('groups.creatorOf')
		.exec(function(err, user) {
			if(err || !user) {
				handleError(res, err);
			} else {
				res.json(user.groups.creatorOf);
			}
		})
};


exports.show = function(req, res) {
  if(!ValidId(req.params.id) || !ValidId(req.params.groupId)) {
      return NotFound(res);
  }
	User.findById(req.params.id)
		.populate('events.organizerOf')
		.exec(function(err, user) {
			if(err || !user) {
				handleError(res, err);
			} else {
				var groups = user.groups.creatorOf.filter(function(item) {
					return item._id == req.params.eventId;
				});

				res.json({
					group: groups[0]
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