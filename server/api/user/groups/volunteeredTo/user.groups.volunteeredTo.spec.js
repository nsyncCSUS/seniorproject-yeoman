'use strict';

var should = require('should');
var app = require('../../../../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;


describe('GET /api/users/:id/groups/volunteeredTo', function() {
    it('should respond with a json array', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/groups/volunteeredTo')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                done();
            });
    });

    it('should respond with a 404 for non-existent users', function(done) {
        request(app)
            .get('/api/users/123456789012345678901234/groups/volunteeredTo')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/users/invalid/groups/volunteeredTo')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('GET /api/users/:id/groups/volunteeredTo/:groupId', function() {
//    it('should respond with a single group', function(done) {
//        request(app)
//            .get('/api/users/000000000000000000000002/groups/volunteeredTo/000000000000000000000000')
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
            .get('/api/users/000000000000000000000002/groups/volunteeredTo/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .get('/api/users/000000000000000000000002/groups/volunteeredTo/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('POST /api/users/:id/groups/volunteeredTo', function() {
    it('should add a group to a users subscriptions list', function(done) {
        request(app)
            .post('/api/users/000000000000000000000002/groups/volunteeredTo/000000000000000000000000')
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
            .post('/api/users/000000000000000000000002/groups/volunteeredTo/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .post('/api/users/000000000000000000000002/groups/volunteeredTo/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});


describe('DELETE /api/users/:id/groups/volunteeredTo/:groupId', function() {
    it('should remove a group from a users subscriptions list', function(done) {
        request(app)
            .delete('/api/users/000000000000000000000002/groups/volunteeredTo/000000000000000000000000')
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
            .delete('/api/users/000000000000000000000002/groups/volunteeredTo/123456789012345678901234')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should reject invalid ids', function(done) {
        request(app)
            .delete('/api/users/000000000000000000000002/groups/volunteeredTo/invalid')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});
