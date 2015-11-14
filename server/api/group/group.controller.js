'use strict';

var _ = require('lodash');
var Group = require('./group.model');

// Get list of groups
exports.index = function(req, res) {
    Group.find({})
    	.populate('organizers')
    	.populate('volunteers')
    	.populate('events')
    	.exec(function(err, groups) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).json(groups);
    });
};


// Get a single group
exports.show = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    Group.findById(req.params.id, function(err, group) {
        if (err) {
            return handleError(res, err);
        }

        if (!group) {
            return res.status(404).send('Not Found');
        }

        return res.json({
        	group: group
        });
    });
};


// Creates a new group in the DB.
exports.create = function(req, res) {
    Group.create(req.body, function(err, group) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json({
        	group: group
        });
    });
};


// Updates an existing group in the DB.
exports.update = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    if (req.body._id) {
        delete req.body._id;
    }
    Group.findById(req.params.id, function(err, group) {
        if (err) {
            return handleError(res, err);
        }
        if (!group) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(group, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({
            	group: group
            });
        });
    });
};


// Deletes a group from the DB.
exports.destroy = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    Group.findById(req.params.id, function(err, group) {
        if (err) {
            return handleError(res, err);
        }
        if (!group) {
            return res.status(404).send('Not Found');
        }
        group.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}

function NotFound(res) {
    return res.status(404).send('Not Found');
};

function ValidId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
};
