'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');


describe('GET /api/users/:id/groups/subscribedTo', function() {
    it('should respond with a json array', function(done) {
        done();
    });
});


describe('GET /api/users/:id/groups/subscribedTo/:groupId', function() {
    it('should respond with a single group', function(done) {
        done();
    });
});


describe('POST /api/users/:id/groups/subscribedTo', function() {
    it('should add a group to a users subscriptions list', function(done) {
        done();
    });
});


describe('DELETE /api/users/:id/groups/subscribedTo/:groupId', function() {
    it('should remove a group from a users subscriptions list', function(done) {
        done();
    });
});