'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;


describe('GET /api/events/:eventId/volunteers', function() {
    it('should respond with an array of users', function(done) {
        request(app)
            .get('/api/events/000000000000000000000000/volunteers')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with a 404 for non-existant events', function(done) {
        request(app)
            .get('/api/events/123456789012345678901234/volunteers')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should respond with 404 for invalid ids', function(done) {
        request(app)
            .get('/api/events/invalid/volunteers')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('GET /api/events/:eventId/volunteers/:volunteerId', function() {
    it('should respond with a single user', function(done) {
        request(app)
            .get('/api/events/000000000000000000000000/volunteers/000000000000000000000002')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body.volunteer).not.to.equal(undefined);
                expect(res.body.volunteer).not.to.equal(null);
                expect(res.body.volunteer).to.be.instanceof(Object);
                done();
            });
    });

    it('should respond with a 404 for non-existant users', function(done) {
        request(app)
            .get('/api/events/000000000000000000000000/volunteers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/events/000000000000000000000000/volunteers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('POST /api/events/:eventId/volunteers/:volunteerId', function() {
    it('should add a new user to the events volunteer list', function(done) {
        request(app)
            .post('/api/events/000000000000000000000000/volunteers/000000000000000000000003')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                var items = res.body.filter(function(item) {
                    return item._id.toString() === '000000000000000000000003';
                });
                expect(items).to.not.be.empty;
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .post('/api/events/000000000000000000000000/volunteers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .post('/api/events/000000000000000000000000/volunteers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            })
    })
});


describe('DELETE /api/events/:eventId/volunteers/:volunteerId', function() {
    it('should delete a user from an events volunteer list', function(done) {
        request(app)
            .delete('/api/events/000000000000000000000000/volunteers/000000000000000000000003')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                var items = res.body.filter(function(item) {
                    return item._id.toString() === '000000000000000000000003';
                });
                expect(items).to.be.empty;
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .delete('/api/events/000000000000000000000000/volunteers/12345678901234567890')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .delete('/api/events/000000000000000000000000/volunteers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});
