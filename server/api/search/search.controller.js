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
var mongoose = require('mongoose');
mongoose.set('debug', true);

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

// Note: set Searchstring to 'all' to find all events
// Get all events that match searchstring for event name or description and
// endTimeDate > current date
// Events sorted in descending order of currentVolunteers


//Note: Mongoose has problems with some conditions specifically evaluateing 2 things
// in the same document
exports.events = function(req,res){
  //console.log(Object.keys(req.body)[0]); grabs first value in object
//This code might be useful in refactoring since adding this line will grab the search value
// regardless of its name
// right now its binded to req.body.searchString

  // RegExp(String , Flags) g=global(?resets some internal counter ) i= ignore case
 // need regEXP object to put search vairable in
 // you cant put in variables directly into a regex
 // req.body.searchString is the string from angular

    var parsedSearch = req.params.searchstring.replace(/\s/gi, "|");
    var searchStringRegExObj = new RegExp(parsedSearch, "gi");
    if(req.params.searchstring ==='all'){
      searchStringRegExObj = new RegExp('.*', "gi");
    }

  Event.find({
     $or:[ {name:searchStringRegExObj}, {description:searchStringRegExObj}],
    endTimeDate: {$gte: new Date(y,mm,dd)}
  }, function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);

}).$where('this.maxVolunteers > this.currentVolunteers').sort({currentVolunteers: -1}).limit(100);
};
