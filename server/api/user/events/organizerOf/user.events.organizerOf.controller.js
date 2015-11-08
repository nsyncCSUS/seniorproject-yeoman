'use strict';

var User = require('../../user.model');
var Event = require('../../../event/event.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    events: user.events.organizerOf
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('events.organizerOf')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var event = user.events.organizerOf.filter(function(item) {
                    return item._id == req.params.eventId;
                });

                res.json({
                    event: event
                });
            }
        });
};


exports.create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
            events: {
    			organizerOf: req.params.eventId
    		}
        }
    }, function(err, user) {
        if (err) {
            handleError(res, err);
        } else {
        	Event.findByIdAndUpdate(req.params.eventId, {
        		$push: {
	        		organizers: req.params.id
	        	}
        	}, function(err, event) {
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
    User.findByIdAndUpdate(req.params.id, {
        $remove: {
            events: {
    			organizerOf: req.params.eventId
            }
        }
    }, function(err, user) {
        if (err) {
            handleError(res, err);
        } else {
        	Event.findByIdAndUpdate(req.params.eventId, {
        		$remove: {
	        		organizers: req.params.id
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

