'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
    active: Boolean,
    creationUser: {
        type: ObjectId,
        ref: 'User'
    },
    
    group: {
        type: ObjectId,
        ref: 'Group'
    },

    picture: {
        type: String,
        default: "//placehold.it/500x500/"
    },

    description: String,
    creationDate: Date,
    startTimeDate: Date,
    endTimeDate: Date,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    maxVolunteers: Number,

    volunteers: [{
        type: ObjectId,
        ref: 'User'
    }],

    interests: [String]
});

module.exports = mongoose.model('Event', EventSchema);
