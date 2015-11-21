/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var User = require('../user/user.model');
var Event = require('../event/event.model');
var _ = require('lodash');

function handleError(res, err) {
  return res.status(500).send(err);
}
// Getting current date.
var someDate = new Date(); // Date format is year/month/day
var dd = someDate.getDate();
var mm = someDate.getMonth() + 1;
var y = someDate.getFullYear();




// server/config/seed to put in test data
// Get list of things
exports.index = function(req, res) {
  User.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(things);
  });
};

// Get all events with
// endTimeDate > current date
// sorted in descending order of currentVolunteers
//Mongoose has problems with some conditions specifically evaluateing 2 things
// in the same document

exports.events = function(req,res){
  Event.find({
    endTimeDate: {$gte: new Date(y,mm,dd)}
  }, function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);

}).$where('this.maxVolunteers > this.currentVolunteers').sort({currentVolunteers: -1});
};
