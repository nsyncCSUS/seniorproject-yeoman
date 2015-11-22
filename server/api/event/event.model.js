'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: {
      type: String,
      required: true
    },

    creationUser: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    group: {
        type: Schema.ObjectId,
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
    duration: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    maxVolunteers: Number,
    numberVolunteers: Number,

    organizers: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],

    volunteers: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],

    interests: [String]
});

module.exports = mongoose.model('Event', EventSchema);
