/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var config = require('./environment');
var mongoose = require('mongoose');
var User = require('../api/user/user.model');
var Event = require('../api/event/event.model');
var Group = require('../api/group/group.model');


// If no connection is available, the db hasn't been connected
// (probably due to running the seed function outside server)
// so start a new connection here
if(mongoose.connection.readyState === 0) {
    mongoose.connect(config.mongo.uri, config.mongo.options);
}



console.log('Seeding...');
Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});





/**
 * Seed example users
 */
User.findOneAndRemove({name: 'Test User'}, function(err) {
    if(err) console.log('Error removing Test User: ', err);
    else console.log('Removed Test User');
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created User: 000000000000000000000000');
    });
});


User.findOneAndRemove({name: 'Admin'}, function(err) {
    if(err) console.log('Error removing Admin: ', err);
    else console.log('Removed Admin');
    User.create({
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created User: 000000000000000000000001');
    });
});


User.findOneAndRemove({_id: '000000000000000000000002'}, function(err) {
    if(err) console.log('Error removing John Something: ', err);
    else console.log('Removed John Something');
    User.create({
        _id: '000000000000000000000002',
        name: 'John Something',
        firstName: 'John',
        lastName: 'Something',
        email: 'john@test.com',
        password: 'test',
        events: {
            creatorOf: [
                '000000000000000000000000'
            ],
            organizerOf: [
                '000000000000000000000000'
            ],
            volunteeredTo: [
                '000000000000000000000000',
                '000000000000000000000001'
            ]
        },
        groups: {
            creatorOf: [],
            organizerOf: [
                '000000000000000000000000'
            ],
            volunteeredTo: [
                '000000000000000000000001'
            ]
        }
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created User: 000000000000000000000002');
    });
});


User.findOneAndRemove({_id: '000000000000000000000003'}, function(err) {
    if(err) return console.log(err);
    User.create({
        name: 'Alex Something Else',
        firstName: 'Alex',
        middleName: 'Something',
        lastName: 'Else',
        _id: '000000000000000000000003',
        password: 'test'
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created User: 000000000000000000000003')
    });
})



/**
 * Seed Events
 */
Event.findOneAndRemove({_id: '000000000000000000000000'}, function() {
    Event.create({
        name: 'Test Event 1',
        _id: '000000000000000000000000',
        organizers: ['000000000000000000000002'],
        volunteers: ['000000000000000000000002'],
        creationUser: '000000000000000000000002',
        group: '000000000000000000000000'
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created Event: 000000000000000000000000');
    });
});


Event.findOneAndRemove({_id: '000000000000000000000001'}, function() {
    Event.create({
      name: 'Test Event 2',
      _id: '000000000000000000000001',
      volunteers: ['000000000000000000000002']
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created Event: 000000000000000000000001');
    });
});



/**
 * Seed Groups
 */
Group.findOneAndRemove({_id: '000000000000000000000000'}, function() {
    Group.create({
        name: 'Test Group 1',
        creationDate: new Date(),
        _id: '000000000000000000000000',
        organizers: [
            '000000000000000000000002'
        ],
        events: [
            '000000000000000000000000'
        ]
    }, function(err) {
        if(err) return console.log('Err: ' + err);
        console.log('Created Group: 000000000000000000000000')
    });
});

Group.findOneAndRemove({_id: '000000000000000000000001'}, function() {
    Group.create({
        name: 'Test Group 1',
        creationDate: new Date(),
        _id: '000000000000000000000001',
        organizers: [
            '000000000000000000000002'
        ]
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created Group: 000000000000000000000001')
    });
});


Group.findOneAndRemove({_id: '000000000000000000000002'}, function() {
    Group.create({
        name: 'Test Group 2',
        creationDate: new Date(),
        _id: '000000000000000000000002',
        volunteers: [
            '000000000000000000000002'
        ]
    }, function(err) {
        if(err) return console.log(err);
        console.log('Created Group: 000000000000000000000002')
    });
});

