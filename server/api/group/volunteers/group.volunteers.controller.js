'use strict';

var Group = require('../group.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
        	if(err || !group) {
        		handleError(res, err); 
        	} else {
        		var volunteers = group.volunteers.map(function(user) {
        			return user.profile;
        		});
        		
        		res.json({
        			volunteers: volunteers
        		});
        	}
        });
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            if (err || !group) {
                handleError(err, res);
            } else {
                var volunteers = group.volunteers.filter(function(item) {
                    return item._id == req.params.volunteerId;
                }).map(function(user) {
                	return user.profile;
                });

                res.json({
                    volunteer: volunteers[0]
                });
            }
        });
};


exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            volunteers: req.params.volunteerId
        }
    }, function(err, group) {
        if (err || !group) {
            handleError(err, res);
        } else {
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$push: {
	        		'groups.volunteeredTo': req.params.id
	        	}
        	}, function(err, volunteer) {
        		if(err || !volunteer) {
        			handleError(res, err);
        		} else {
        			res.status(200).send('success');
        		}
        	});
        }
    });
};


exports.destroy = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $pull: {
            volunteers: req.params.volunteerId
        }
    }, function(err) {
        if (err) {
            handleError(err, res);
        } else {
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$pull: {
	        		'groups.organizerOf': req.params.id
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
};


function handleError(err, res) {
    res.status(500).send(err);
};