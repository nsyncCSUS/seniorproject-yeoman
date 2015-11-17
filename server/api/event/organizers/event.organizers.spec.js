'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var expect = require('chai').expect;
var Event = require('../event.model');
var User = require('../../user/user.model');


describe('GET /api/events/:id/organizers', function() {
    it('should retrieve a list of users', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/events/000000000000000000000000/organizers')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});


describe('GET /api/events/:eventId/organizers/:organizerId', function() {
    it('should get a single user', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/events/000000000000000000000000/organizers/123456789012345678901234')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.should.be.instanceof(Object);
                return done();
            });
    });

    it('should reject invalid ids', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/events/000000000000000000000000/organizers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('POST /api/events/:id/organizers/:organizerId', function() {
    it('should add a new user to organizers list', function(done) {
        this.timeout(10000);
        User.find({}, function(err, users) {
            console.log(users);
            var user = users.pop();
            var userId = user._id;
            if(err) return done(err);
            request(app)
                .post('/api/events/000000000000000000000000/organizers/' + userId)
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });

    it('should not add a user more than once', function(done) {
        this.timeout(10000);
        User.find({}, function(err, users) {
            var user = users.pop();
            var userId = user._id;
            if(err) return done(err);
            request(app)
            .post('/api/events/000000000000000000000000/organizers/' + userId)
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                request(app)
                    .post('/api/events/000000000000000000000000/organizers/' + userId)
                    .expect(200)
                    .end(function(err, res) {
                        if(err) return done(err);
                        Event.findById('000000000000000000000000', function(err, event) {
                            if(err) return done(err);
                            var length = event.organizers.filter(function(item) {
                                return item == userId;
                            }).length;
                            expect(length).to.equal(1);
                        });
                    });
            });
        });
    });

    it('should not add a user if the user does not exist', function(done) {
        this.timeout(10000);
        request(app)
            .post('/api/events/000000000000000000000000/organizers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('DELETE /api/events/:id/organizers', function() {
    it('should delete a user from the organizers list', function(done) {
    	  this.timeout(10000);
        done();
    });

    it('should not delete a user if the user is not found', function(done) {
    	  this.timeout(10000);
        done();
    });
});














