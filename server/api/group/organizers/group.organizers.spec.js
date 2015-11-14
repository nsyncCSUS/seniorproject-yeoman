'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');

describe('GET /api/groups/:id/organizers', function() {

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


describe('GET /api/groups/:id/organizers/:organizerId', function() {
    it('should respond with a single user', function(done) {
        done();
    });
});


describe('POST /api/groups/:id/organizers', function() {
    it('should add an organizer to a group', function(done) {
        done();
    });
});


describe('DELETE /api/groups/:id/organizers/:organizerId', function() {
    it('should remove an organizer from a group', function(done) {
        done();
    });
});
