'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');




// testing if there is a json response
describe('GET /api/search/events/all', function() {
    it('should respond with JSON array', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/search/events/all')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});

//Testing the intrests parametes
describe('GET /api/search/events/all?boats', function() {
    it('should respond with JSON array', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/search/events/all?boats moats')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
//testing the searchString and intrests paraters
describe('GET /api/search/events/sports football?boats', function() {
    it('should respond with JSON array', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/search/events/sports football?boats moats')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
//testing the searchString and intrests paraters
describe('/api/search/groups/sports football?boats', function() {
    it('should respond with JSON array', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/search/groups/sports football?boats')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});



describe('GET /api/search/users/huyz', function() {
    it('should respond with JSON array', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/search/users/huyz')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
