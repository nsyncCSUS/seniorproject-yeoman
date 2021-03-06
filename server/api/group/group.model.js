'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creationUser: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    active: Boolean,

    picture: {
        type: String,
        default: '//placehold.it/500x500/'
    },

    creationDate: {
        type: Date,
        required: true
    },

    city: String,
    state: String,
    zipcode: String,
    description: String,
    googlePlusURL: String,
    facebookURL: String,
    linkedInURL: String,
    twitterURL: String,
    personalWebsiteURL: String,
    numberSubcribers: Number,

    events: [{
        type: Schema.ObjectId,
        ref: 'Event'
    }],

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

module.exports = mongoose.model('Group', GroupSchema);
