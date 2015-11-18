'use strict';

var should = require('should');
var app = require('../../../../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;


describe('GET /api/users/:id/groups/creatorOf', function() {
    it('should respond with a json array', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/groups/creatorOf')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .get('/api/users/123456789012345678901234/groups/creatorOf')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/users/invalid/groups/creatorOf')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('GET /api/users/:id/groups/creatorOf/:groupId', function() {
//    it('should respond with a single group', function(done) {
//        request(app)
//            .get('/api/users/000000000000000000000002/groups/creatorOf/000000000000000000000000')
//            .expect(200)
//            .end(function(err, res) {
//                if(err) return done(err);
//                expect(res.body.group).to.exist;
//                expect(res.body.group._id).to.equal('000000000000000000000000');
//                done();
//            });
//    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/groups/creatorOf/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/groups/creatorOf/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});
