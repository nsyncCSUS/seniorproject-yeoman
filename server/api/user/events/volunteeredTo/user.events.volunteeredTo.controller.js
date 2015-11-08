'use strict';

var User = require('../../user.model');
var Event = require('../../../event/event.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('events.volunteeredTo')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                res.json({
                    events: user.events.volunteeredTo
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('events.volunteeredTo')
        .exec(function(err, user) {
            if (err) {
                handleError(res, err);
            } else {
                var event = user.events.volunteeredTo.filter(function(item) {
                    return item == req.params.eventId;
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
    			volunteeredTo: req.params.eventId
    		}
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
        	Event.findByIdAndUpdate(req.params.eventId, {
        		$push: {
	        		volunteers: req.params.id
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
            	volunteeredTo: req.params.eventId
    		}
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
        	Event.findByIdAndUpdate(req.params.eventId, {
        		$remove: {
	        		volunteers: req.params.id
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