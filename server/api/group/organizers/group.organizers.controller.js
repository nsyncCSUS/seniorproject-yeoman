'use strict';

var Group = require('../group.model');
var User = require('../../user/user.model');


exports.index = function(req, res) {
    if(!ValidId(req.params.id)) {
        return NotFound(res);
    }
    Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err || !group) {
                handleError(res, err);
            } else {
            	var organizers = group.organizers.map(function(user) {
            		return user.profile;
            	});

                res.json(organizers);
            }
        });
};


exports.show = function(req, res) {
    if(!ValidId(req.params.id) || !ValidId(req.params.organizerId)) {
        return NotFound(res);
    }
    Group.findById(req.params.id)
        .populate('organizers')
        .exec(function(err, group) {
            if (err || !group) {
                handleError(res, err);
            } else {
                var organizer = group.organizers.filter(function(item) {
                    return item._id == req.params.organizerId;
                }).map(function(user) {
                	return user.profile;
                });

                res.json({
                    organizer: organizer[0]
                });
            }
        });
};



exports.create = function(req, res) {
    if(!ValidId(req.params.id) || !ValidId(req.params.organizerId)) {
        return NotFound(res);
    }
    Group.findByIdAndUpdate(req.params.id, {
        $push: {
            organizers: req.params.organizerId
        }
    }, function(err, group) {
        if (err || !group) {
            handleError(res, err);
        } else {
        	User.findByIdAndUpdate(req.params.organizerId, {
        		$push: {
        			'groups.organizerOf': req.params.id
	        	}
        	}, function(err, organizer) {
        		if(err || !organizer) {
        			handleError(res, err);
        		} else {
        			res.status(200).send('success');
        		}
        	});
        }
    });
};



exports.destroy = function(req, res) {
    if(!ValidId(req.params.id) || !ValidId(req.params.organizerId)) {
        return NotFound(res);
    }
    Group.findByIdAndUpdate(req.params.id, {
        $pull: {
            organizers: req.params.organizerId
        }
    }, function(err, group) {
        if (err || !group) {
            handleError(res, err);
        } else {
        	User.findByIdAndUpdate(req.params.organizerId, {
        		$pull: {
	        		'groups.organizerOf': req.params.id
	        	}
        	}, function(err) {
        		if(err) {
        			handleError(res, err);
        		} else {
        			res.status(200).send('success');
        		}
        	});
        }
    });
};



function handleError(res, err) {
    return res.status(500).send(err);
};

function NotFound(res) {
    return res.status(404).send('Not Found');
};

function ValidId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
};
