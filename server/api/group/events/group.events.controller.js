'use strict';

var Group = require('../group.model');
var Event = require('../../event/event.model');


exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('events')
        .exec(function(err, groups) {
            res.json({
                events: groups.events
            });
        });
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('events')
        .exec(function(err, group) {
            if (err) {
                handleError(res, err);
            } else {
                var events = group.events.filter(function(index, item) {
                    return item._id == req.params.eventId;
                });

                res.json({
                    events: events
                })[0];
            }
        });
};


/**
 * Create new event: must create event and add it to 
 * group's list of events, and add group as event's
 * creation group.
 */
exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            events: req.params.eventId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
//        	Event.findByIdAndUpdate(req.params.eventId, {
//        		$push: {
//	        		
//	        	}
//        	}, function(err, event) {
//        		if(err) {
//        			handleError(res, err);
//        		} else {
//        			res.status(200).end();
//        		}
//        	});
        	res.status(200).end();
        }
    });
};


/**
 * Delete an event: To do this we must delete
 * the event and remove it from the group's 
 * event list.
 */
exports.destroy = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $remove: {
            events: req.params.eventId
        }
    }, function(err) {
        if (err) {
            handleError(res, err);
        } else {
            res.status(200).end();
        }
    });
};


function handleError(res, err) {
    res.status(500).send(err);
}