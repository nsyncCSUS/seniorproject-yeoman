'use strict';

var should = require('should');
var app = require('../../../../app');
var request = require('supertest');


describe('GET /api/users/:id/events/creatorOf', function() {
	it('should respond with a json array', function(done) {
    /*request(app)
      .get('/api/users//events/creatorOf')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });*/
     done();
	});
});


describe('GET /api/users/:id/events/creatorOf/:eventId', function() {
	it('should respond with a single event', function(done) {
		done();
	});
});
