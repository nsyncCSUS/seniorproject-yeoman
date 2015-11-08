'use strict';

var _ = require('lodash');
var Event = require('../event.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    Event.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, event) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    organizers: event.organizers
                });
            }
        });
};


exports.show = function(req, res) {
    Event.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, event) {
            if (err) {
                handleError(res, err);
            } else {
                var organizer = event.organizers.filter(function(item) {
                    return item._id == req.params.organizerId;
                });

                res.json({
                    organizer: organizer[0]
                });
            }
        });
};


exports.create = function(req, res) {
    Event.findByIdAndUpdate(req.params.id, {
        $push: {
            organizers: req.params.organizerId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
            User.findByIdAndUpdate(req.params.organizerId, {
                $push: {
	            	events: {
		            	organizerOf: req.params.id
		            }
	            }
            }, function(err) {
                if (err) {
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
            organizers: req.params.organizerId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
        	User.findByIdAndUpdate(req.params.organizerId, {
        		events: {
	        		organizerOf: req.params.id
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


function handleError(res, err) {
    return res.status(500).send(err);
};