'use strict';

var User = require('../user.model');
var Group = require('../../group/group.model');


exports.create = function(req, res) {
	var params = req.body.group;
	params.creationUser = req.params.id;
	Group.create(params, function(err, group) {
		if(err) {
			handleError(res, err);
		} else {
			User.findByIdAndUpdate(req.params.id, {
				$push: {
					'groups.creatorOf': group._id,
					'groups.organizerOf': group._id
				}
			}, function(err, user) {
				if(err) {
					handleError(res, err);
				} else {
					res.status(200).json({
						user: user
					});
				}
			});
		}
	});
};


function handleError(res, err) {
	res.status(500).send(err);
};
