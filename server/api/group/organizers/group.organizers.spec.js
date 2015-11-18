'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;


describe('GET /api/groups/:id/organizers', function() {
    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/organizers')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with a 404 for non-existent groups', function(done) {
        request(app)
            .get('/api/groups/123456789012345678901234/organizers')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/groups/invalid/organizers')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('GET /api/groups/:id/organizers/:organizerId', function() {
    it('should respond with a single user', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/organizers/000000000000000000000002')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Object);
                expect(res.body.organizer._id).to.equal('000000000000000000000002');
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/organizers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/groups/000000000000000000000000/organizers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('POST /api/groups/:id/organizers/:organizerId', function() {
    it('should add an organizer to a group', function(done) {
        request(app)
            .post('/api/groups/000000000000000000000000/organizers/000000000000000000000003')
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
            .post('/api/groups/000000000000000000000000/organizers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .post('/api/groups/000000000000000000000000/organizers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('DELETE /api/groups/:id/organizers/:organizerId', function() {
    it('should remove an organizer from a group', function(done) {
        request(app)
            .delete('/api/groups/000000000000000000000000/organizers/000000000000000000000003')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                var items = res.body.filter(function(item) {
                    return item._id.toString() === '000000000000000000000003';
                });
                expect(items).to.be.empty;
                done();
            })
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .delete('/api/groups/000000000000000000000000/organizers/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .delete('/api/groups/000000000000000000000000/organizers/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});
