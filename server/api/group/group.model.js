'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  info: String,
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

    events: [{
        type: ObjectId,
        ref: 'Event'
    }],

    organizers: [{
        type: ObjectId,
        ref: 'User'
    }],

    subscriptions: [{
        type: ObjectId,
        ref: 'User'
    }],

    interests: [String]
});

module.exports = mongoose.model('Group', GroupSchema);
