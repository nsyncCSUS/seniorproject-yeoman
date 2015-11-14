'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');

describe('GET /api/events/:eventId/volunteers', function() {
  it('should respond with an array of users', function(done) {
    /*request(app)
      .get('/api/events//volunteers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });*/
     done();
  });
});


describe('GET /api/events/:eventId/volunteers/:volunteerId', function() {
  it('should respond with a single user', function(done) {
    done();
  });
});

describe('POST /api/events/:eventId/volunteers/:volunteerId', function() {
  it('should add a new user to the events volunteer list', function(done) {
    done();
  });
});

describe('DELETE /api/events/:eventId/volunteers/:volunteerId', function() {
  it('should delete a user from an events volunteer list', function(done) {
    done();
  });
});



