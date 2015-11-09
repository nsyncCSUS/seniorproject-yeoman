'use strict';

var User = require('../../user.model');
var Group = require('../../../group/group.model');


exports.index = function(req, res) {
    User.findById(req.params.id)
        .populate('groups.subscribedTo')
        .exec(function(err, user) {
            if (err || !user) {
                handleError(res, err);
            } else {
                res.json({
                    groups: user.groups.subscribedTo
                });
            }
        });
};


exports.show = function(req, res) {
    User.findById(req.params.id)
        .populate('groups.subscribedTo')
        .exec(function(err, user) {
            if (err || !user) {
                handleError(res, err);
            } else {
                var group = user.groups.subscribedTo.filter(function(item) {
                    return item._id == req.params.groupId;
                });

                res.json({
                    group: group[0]
                });
            }
        });
};


exports.create = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
    		'groups.subscribedTo': req.params.groupId
        }
    }, function(err, user) {
        if (err || !user) {
            handleError(res, err);
        } else {
        	Group.findByIdAndUpdate(req.params.groupId, {
        		$push: {
	        		volunteers: req.params.id
	        	}
        	}, function(err, group) {
        		if(err || !group) {
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
    		'groups.subscribedTo': req.params.groupId
        }
    }, function(err, user) {
        if (err || !user) {
            handleError(res, err);
        } else {
        	Group.findByIdAndUpdate(req.params.groupId, {
        		$pull: {
	        		volunteers: req.params.id
	        	}
        	}, function(err, group) {
        		if(err || !group) {
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