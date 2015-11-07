'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
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
    street: String,
    city: String,
    state: String,
    zipcode: String,
    maxVolunteers: Number,

    volunteers: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],

    interests: [String]
});

module.exports = mongoose.model('Event', EventSchema);