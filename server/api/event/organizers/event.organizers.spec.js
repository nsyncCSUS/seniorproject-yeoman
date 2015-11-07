'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');


describe('GET /api/events/:id/organizers', function() {
    it('should retrieve a list of users', function(done) {
        done();
    });

    it('should get a single user by id', function(done) {
        done();
    });

    it('should return nothing if no user exists', function(done) {
        done();
    });
});


describe('POST /api/events/:id/organizers', function() {
    it('should add a new user to organizers list', function(done) {
        done();
    });

    it('should not add a user more than once', function(done) {
        done();
    });

    it('should not add a user if the user does not exist', function(done) {
        done();
    });
});


describe('DELETE /api/events/:id/organizers', function() {
    it('should delete a user from the organizers list', function(done) {
        done();
    });

    it('should not delete a user if the user is not found', function(done) {
        done();
    });
});