'use strict';

var User = require('../user.model');
var Group = require('../../group/group.model');


exports.create = function(req, res) {
  if(!ValidId(req.params.id)) {
      return NotFound(res);
  }
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
					res.status(200).send('success');
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
