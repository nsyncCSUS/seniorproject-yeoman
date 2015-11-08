'use strict';

var Event = require('../event.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    volunteers: event.volunteers
                });
            }
        });
};


exports.show = function(req, res) {
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            if (err) {
                handleError(res, err);
            } else {
                var volunteers = event.volunteers.filter(function(index, item) {
                    return item._id == req.params.volunteerId;
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
        if (err) {
            handleError(res, err);
        } else {
        	// If volunteer update successful, 
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$push: {
	        		events: {
		        		volunteeredTo: req.params.id
		        	}
	        	}
        	}, function(err, user) {
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
    Event.findByIdAndUpdate(req.params.id, {
        $remove: {
            volunteers: req.params.volunteerId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
        	// Remove event from volunteer's event list
        	User.findByIdAndUpdate(req.params.volunteerId, {
        		$remove: {
	        		event: {
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


function handleError(res, err) {
    res.status(500).send(err);
};