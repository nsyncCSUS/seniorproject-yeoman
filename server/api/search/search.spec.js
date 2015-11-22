'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;



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


// testing query ordering numberVolunteers descending
describe('GET /api/search/events/all', function() {
    it('numberVolunteers should be ordered in descending order', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/search/events/all')
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                for(var i=0; i< (res.body.length)-1; i++){
                expect(res.body[i].numberVolunteers).to.be.above(res.body[i+1].numberVolunteers)||
                expect(res.body[i].numberVolunteers).to.be.equal(res.body[i+1].numberVolunteers)
              }
                done();
            });
    });
});
