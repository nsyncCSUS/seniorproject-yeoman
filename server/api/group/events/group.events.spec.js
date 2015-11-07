'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/groups/:id/events', function() {

    it('should respond with JSON array', function(done) {
        //    request(app)
        //      .get('/api/groups')
        //      .expect(200)
        //      .expect('Content-Type', /json/)
        //      .end(function(err, res) {
        //        if (err) return done(err);
        //        res.body.should.be.instanceof(Array);
        //        done();
        //      });
        done();
    });
});


describe('GET /api/groups/:id/events/:eventId', function() {
    it('should respond with a single event', function(done) {
        done();
    });
});


describe('POST /api/groups/:id/events', function() {
    it('should add an event to the groups event list', function(done) {
        done();
    });
});


describe('DELETE /api/groups/:id/events/:eventId', function() {
    it('should delete an event from a groups event list', function(done) {
        done();
    });
});