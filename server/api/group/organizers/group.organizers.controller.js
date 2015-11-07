'use strict';

var Group = require('../group.model');


/**
 * Get all organizers from a group
 */
exports.index = function(req, res) {
    Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err) {
                handleError(res, err);
            } else {
                res.send({
                    organizers: group.organizers
                });
            }
        });
};


/**
 * Get a single organizer from a group
 */
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


/**
 * Add an organizer to a group
 */
exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            organizers: req.params.organizerId
        }
    }, function(err, group) {
        if (err) {
            handleError(res, err);
        } else {
            res.status(200).end();
        }
    });
};


/**
 * Delete an organizer from a group
 */
exports.destroy = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {
        $remove: {
            organizers: req.params.organizerId
        }
    }, function(err, group) {
        if (err) {
            handleError(res, err);
        } else {
            res.status(200).end();
        }
    });
};


/**
 * Handle server error
 */
function handleError(res, err) {
    res.status(500).send(err);
};