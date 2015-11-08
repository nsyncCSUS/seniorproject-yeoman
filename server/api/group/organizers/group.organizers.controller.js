'use strict';

var Group = require('../group.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    organizers: group.organizers
                });
            }
        });
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err) {
                handleError(res, err);
            } else {
                var organizer = group.organizers.filter(function(item) {
                    return item._id == req.params.organizerId;
                });

                res.json({
                    organizer: organizer[0]
                });
            }
        });
};



exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            organizers: req.params.organizerId
        }
    }, function(err, group) {
        if (err) {
            handleError(res, err);
        } else {
        	User.findByIdAndUpdate(req.params.organizerId, {
        		$push: {
	        		groups: {
		        		organizerOf: req.params.id
		        	}
	        	}
        	}, function(err, organizer) {
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
            organizers: req.params.organizerId
        }
    }, function(err, group) {
        if (err) {
            handleError(res, err);
        } else {
        	User.findByIdAndUpdate(req.params.organizerId, {
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



function handleError(res, err) {
    res.status(500).send(err);
};