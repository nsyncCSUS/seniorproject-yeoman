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
var Group = require('../group/group.model');
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.set('debug', true);

function handleError(res, err) {
  return res.status(500).send(err);
}





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
  // Getting current date.
  var currentDate = new Date(); // Date format is year/month/day
  var curdd = currentDate.getDate();
  var curmm = currentDate.getMonth() + 1;
  var curyyyy = currentDate.getFullYear();
  var curmin= currentDate.getMinutes();
  var curhour = currentDate.getHours();

  //console.log(Object.keys(req.body)[0]); grabs first value in object
//This code might be useful in refactoring since adding this line will grab the search value
// regardless of its name
// right now its binded to req.body.searchString

  // RegExp(String , Flags) g=global(find all matches ) i= ignore case
 // need regEXP object to put search vairable in
 // you cant put in variables directly into a regex
 // req.body.searchString is the string from angular

  //  console.log( Object.keys(req.query)[0]);
    //console.log(req.query);
    var intrestsRegExObj;
    var parsedIntrests= Object.keys(req.query)[0];

    var parsedSearch = req.params.searchstring.replace(/\s/gi, "|");
    var searchStringRegExObj = new RegExp(parsedSearch, "gi");

    if(req.params.searchstring ==='all'){
      searchStringRegExObj = new RegExp('.*', "gi");
    }
     if(parsedIntrests=== undefined){
      intrestsRegExObj = new RegExp('.*', "gi");
    }else{
       parsedIntrests = parsedIntrests.replace(/\s/gi, "|");
       intrestsRegExObj = new RegExp(parsedIntrests, "gi");
    }


  Event.find({
     $or:[ {name:searchStringRegExObj}, {description:searchStringRegExObj}],
     interests :intrestsRegExObj,
    endTimeDate: {$gte: new Date(curyyyy,curmm,curdd,curhour,curmin)}
  }, function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);

}).$where('this.maxVolunteers > this.numberVolunteers').sort({numberVolunteers: -1}).limit(100);
};



// find the users given
exports.users = function(req,res){
  var searchStringRegExObj = new RegExp(req.params.username, "gi");
  if(req.params.username ==='all'){
     searchStringRegExObj = new RegExp('.*', "gi");
  }


  User.find({
    name: searchStringRegExObj
  }, function(err, data) {
    if (err) {
      throw err;
    }

      res.send(data);
  }).limit(100);

};


//find group Search option(groupname groupdescription or group intrests )
exports.groups = function(req,res){
  var intrestsRegExObj;
  var parsedIntrests= Object.keys(req.query)[0];

  var parsedSearch = req.params.groupname.replace(/\s/gi, "|");
  var searchStringRegExObj = new RegExp(parsedSearch, "gi");

  if(req.params.groupname ==='all'){
    searchStringRegExObj = new RegExp('.*', "gi");
  }
   if(parsedIntrests=== undefined){
    intrestsRegExObj = new RegExp('.*', "gi");
  }else{
     parsedIntrests = parsedIntrests.replace(/\s/gi, "|");
     intrestsRegExObj = new RegExp(parsedIntrests, "gi");
  }


Group.find({
   $or:[ {name:searchStringRegExObj}, {description:searchStringRegExObj}],
   interests :intrestsRegExObj,
}, function(err, data) {
  if (err) {
    throw err;
  }
  res.send(data);

}).sort({numberSubcribers: -1}).limit(100);
};
