'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('GET /api/groups/:id/events', function() {
    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/events')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with 404 for non-existent groups', function(done) {
        request(app)
            .get('/api/groups/123456789012345678901234/events')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/groups/invalid/events')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});


describe('GET /api/groups/:id/events/:eventId', function() {
    it('should respond with a single event', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/events/000000000000000000000000')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with a 404 for non-existent events', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/events/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with a 404 for invalid ids', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/events/invalid')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});


describe('DELETE /api/groups/:id/events/:eventId', function() {
    it('should delete an event from a groups event list', function(done) {
        request(app)
            .delete('/api/groups/000000000000000000000000/events/000000000000000000000000')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                var items = res.body.filter(function(item) {
                    return item._id.toString() === '';
                });
                expect(items).to.be.empty;
                done();
            });
    });

    it('should respond with a 404 for non-existent events', function(done) {
        request(app)
            .delete('/api/groups/000000000000000000000000/events/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .delete('/api/groups/000000000000000000000000/events/invalid')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});