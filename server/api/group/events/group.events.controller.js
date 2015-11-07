
var Group = require('./group.model');


exports.index = function(req, res) {
    
};


exports.show = function(req, res) {
    Group.findById(req.params.id)
        .populate('events')
        .execute(function(err, group) {
            var events = group.events.filter(function(index, item) {
                return item._id == req.params.eventId;
            });
            res.json({events: events});
        });
};


exports.create = function(req, res) {
    Group.findByIdAndUpdate(req.params.id, {$push: {events: req.params.eventId}}, function(err) {
        if(err) {
            res.send(err);
        }
    });
};


exports.destroy = function(req, res) {
    
};



