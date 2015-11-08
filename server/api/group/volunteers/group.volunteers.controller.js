'use strict';

var Group = require('../group.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
        	if(err) {
        		handleError(res, err); 
        	} else {
        		res.json({
        			volunteers: group.volunteers
        		});
        	}
        });
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, group) {
            if (err) {
                handleError(err, res);
            } else {
                var volunteers = group.volunteers.filter(function(index, item) {
                    return item._id == req.params.volunteerId;
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
    }, function(err) {
        if (err) {
            handleError(err, res);
        } else {
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$push: {
	        		groups: {
		        		volunteeredTo: req.params.id
		        	}
	        	}
        	}, function(err, volunteer) {
        		if(err) {
        			handleError(res, err);
        		} else {
        			res.status(200).end();
        		}
        	});
        }
    });
};


exports.destroy = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $remove: {
            volunteers: req.params.volunteerId
        }
    }, function(err) {
        if (err) {
            handleError(err, res);
        } else {
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$remove: {
	        		groups: {
		        		organizerOf: req.params.id
		        	}
	        	}
        	}, function(err) {
        		if(err) {
        			handleError(res, err);
        		} else {
        			res.status(200).end();
        		}
        	});
        }
    });
};


function handleError(err, res) {
    res.status(500).send(err);
};