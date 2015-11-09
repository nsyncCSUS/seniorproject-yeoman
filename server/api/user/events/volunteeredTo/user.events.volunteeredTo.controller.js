'use strict';

var User = require('../../user.model');
var Event = require('../../../event/event.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('events.volunteeredTo')
        .exec(function(err, user) {
            if (err || !user) {
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
            if (err || !user) {
                handleError(res, err);
            } else {
                var event = user.events.volunteeredTo.filter(function(item) {
                    return item._id == req.params.eventId;
                });

                res.json({
                    event: event[0]
                });
            }
        });
};


exports.create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
    		'events.volunteeredTo': req.params.eventId
        }
    }, function(err, user) {
        if (err || !user) {
            handleError(res, err);
        } else {
        	Event.findByIdAndUpdate(req.params.eventId, {
        		$push: {
	        		volunteers: req.params.id
	        	}
        	}, function(err, event) {
        		if(err || !event) {
        			handleError(res, err);
        		} else {
        			res.status(200).send('success');
        		}
        	});
        }
    });
};



exports.destroy = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $pull: {
    		'events.volunteeredTo': req.params.eventId
        }
    }, function(err, user) {
        if (err || !user) {
            handleError(res, err);
        } else {
        	Event.findByIdAndUpdate(req.params.eventId, {
        		$pull: {
	        		volunteers: req.params.id
	        	}
        	}, function(err, event) {
        		if(err || !event) {
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