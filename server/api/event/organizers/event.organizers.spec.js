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
        request(app)
            .post('/api/events/000000000000000000000000/organizers/000000000000000000000003')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should not add a user more than once', function(done) {
        this.timeout(50000);
        request(app)
            .post('/api/events/000000000000000000000000/organizers/000000000000000000000003')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                var length = res.body.length;
                request(app)
                    .post('/api/events/000000000000000000000000/organizers/000000000000000000000003')
                    .expect(200)
                    .end(function(err, res) {
                        if(err) return done(err);
                        expect(res.body.length).to.equal(length);
                        done();
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
    	  request(app)
    	      .delete('/api/events/000000000000000000000000/organizers/000000000000000000000003')
    	      .expect(200)
    	      .end(function(err, res) {
    	          if(err) return done(err);
    	          done();
    	      });
    });

    it('should reject invalid ids', function(done) {
    	  this.timeout(10000);
    	  request(app)
    	      .delete('/api/events/000000000000000000000000/organizers/invalid')
    	      .expect(404)
    	      .end(function(err, res) {
    	          if(err) return done(err);
    	          done();
    	      })
    });

    it('should reject nnon-existant users', function(done) {
        this.timeout(10000);
        request(app)
            .delete('/api/events/000000000000000000000000/organizers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});














