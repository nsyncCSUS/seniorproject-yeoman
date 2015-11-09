'use strict';

var Event = require('../event.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err || !event) {
                handleError(res, err);
            } else {
            	var volunteers = event.volunteers.map(function(user) {
            		return user.profile;
            	});
            	
                res.json({
                    volunteers: volunteers
                });
            }
        });
};


exports.show = function(req, res) {
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err || !event) {
                handleError(res, err);
            } else {
                var volunteers = event.volunteers.filter(function(item) {
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
    Event.findByIdAndUpdate(req.params.id, {
        $push: {
            volunteers: req.params.volunteerId
        }
    }, function(err, event) {
        if (err || !event) {
            handleError(res, err);
        } else {
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$push: {
        			'events.volunteeredTo': req.params.id
	        	}
        	}, function(err, user) {
        		if(err || !user) {
        			handleError(res, err);
        		} else {
        			res.status(200).send('success');
        		}
        	});
        }
    });
};


exports.destroy = function(req, res) {
    Event.findByIdAndUpdate(req.params.id, {
        $pull: {
            volunteers: req.params.volunteerId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
        	// Remove event from volunteer's event list
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$pull: {
        			'event.volunteeredTo': req.params.id
	        	}
        	}, function(err, volunteer) {
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