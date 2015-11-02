'use strict';

var Event = require('./event.model');

exports.index = function(req, res) {
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            res.json(event);
        });
};

exports.show = function(req, res) {
    Event.findById(req.params.id)
        .populate('volunteers')
        .exec(function(err, event) {
            var volunteers = event.volunteers.filter(function(index, item) {
                return item._id == req.params.volunteerId;
            });
            
            res.json({volunteer: volunteers[0]});
        });
};

exports.create = function(req, res) {
    Event.findByIdAndUpdate(req.params.id, {$push: {volunteers: req.params.volunteerId}}, function(err, event) {
        if(err) {
            res.send(err);
        } else {
            res.end();
        }
    });
};

exports.destroy = function(req, res) {
    
};


