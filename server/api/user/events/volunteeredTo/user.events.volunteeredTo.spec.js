'use strict';

var should = require('should');
var app = require('../../../../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;


describe('GET /api/users/:id/events/volunteeredTo', function() {
    it('should respond with a json array', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/events/volunteeredTo')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .get('/api/users/123456789012345678901234/events/volunteeredTo')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/users/invalid/events/volunteeredTo')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('GET /api/users/:id/events/volunteeredTo/:eventId', function() {
//    it('should respond with a single user', function(done) {
//        request(app)
//            .get('/api/users/000000000000000000000002/events/volunteeredTo/000000000000000000000000')
//            .expect(200)
//            .end(function(err, res) {
//                if(err) return done(err);
//                expect(res.body.event).to.exist;
//                expect(res.body.event).to.be.instanceof(Object);
//                expect(res.body.event._id).to.equal('');
//                done();
//            });
//    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/events/volunteeredTo/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/events/volunteeredTo/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('POST /api/users/:id/events/volunteeredTo', function() {
    it('should add an event to the users events list', function(done) {
        request(app)
            .post('/api/users/000000000000000000000002/events/volunteeredTo/000000000000000000000000')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                var items = res.body.filter(function(item) {
                    return item._id.toString() === '000000000000000000000000';
                });
                expect(items).to.not.be.empty;
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .post('/api/users/000000000000000000000002/events/volunteeredTo/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .post('/api/users/000000000000000000000002/events/volunteeredTo/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('DELETE /api/users/:id/events/volunteeredTo/:eventId', function() {
    it('should remove an event from a users events list', function(done) {
        request(app)
            .delete('/api/users/000000000000000000000002/events/volunteeredTo/000000000000000000000000')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                var items = res.body.filter(function(item) {
                    return item._id.toString() === '000000000000000000000000';
                });
                expect(items).to.be.empty;
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .delete('/api/users/000000000000000000000002/events/volunteeredTo/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .delete('/api/users/000000000000000000000002/events/volunteeredTo/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});
