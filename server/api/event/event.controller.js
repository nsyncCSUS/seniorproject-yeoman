'use strict';

var _ = require('lodash');
var Event = require('./event.model');

// Get list of events
exports.index = function(req, res) {
    Event.find({})
    	.populate('organizers')
    	.populate('volunteers')
	    .exec(function(err, events) {
	        if (err) {
	            return handleError(res, err);
	        }

	        return res.status(200).json(events);
	    });
};

// Get a single event
exports.show = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        return res.json({
        	event: event
        });
    });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
   Event.create(req.body, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json({
        	event: event
        });
    });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    } else if (req.body._id) {
        delete req.body._id;
    }
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(event, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({
            	event: event
            });
        });
    });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        event.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
};

function NotFound(res) {
    return res.status(404).send('Not Found');
};

function ValidId(id) {
    var idRegex = new RegExp(/^[0-9a-fA-F]{24}$/);
    return id.match(idRegex);
};
