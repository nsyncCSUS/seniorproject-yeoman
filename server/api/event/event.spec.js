'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;
var Event = require('./event.model');


describe('GET /api/events', function() {

    it('should respond with JSON array', function(done) {
        this.timeout(10000);
        request(app)
            .get('/api/events')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});



describe('GET /api/events/:eventId', function() {
     it('should retrieve a single element', function(done) {
        this.timeout(10000);
        Event.find({}).exec(function(err, events) {
          if(err) return done(err);
          var id = events.pop()._id;
          request(app)
        	  .get('/api/events/' + id)
        	  .expect(200)
        	  .expect('Content-Type', /json/)
        	  .end(function(err, res) {
        		  if(err) return done(err);
        		  res.body.should.be.instanceof(Object);
        		  done();
        	  });
        });
    });


    it('should respond with a 404 if user not found', function(done) {
      this.timeout(5000);
      var id = 'testid';
      request(app)
        .get('/api/events/' + id)
        .expect(404)
        .end(function(err, res) {
          if(err) return done(err);
          done();
        });
    });
});



describe('PUT /api/events/:eventId', function() {
    this.timeout(50000);

    it('should update an element in the database', function(done) {
        Event.create({name: 'Test Event'}, function(err, event) {
            request(app)
                .put('/api/events/' + event._id)
                .send({name: 'Other Name'})
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    Event.findById(event._id, function(err, _event) {
                        if(err) return done(err);
                        expect(_event.name).to.equal('Other Name');
                        Event.findByIdAndRemove(event._id, function(err) {
                            if(err) return done(err);
                            done();
                        });
                    });
                });
        });
    });

    it('should not update elements with invalid fields', function(done) {
        Event.create({name: 'Test Event'}, function(err, event) {
            request(app)
                .put('/api/events' + event._id, {invalid_field: 'Something'})
                .expect(200)
                .end(function(err) {
                    Event.findById(event._id, function(err, _event) {
                        if(err) return done(err);
                        expect(_event.invalid_field).to.equal(undefined);
                        Event.findByIdAndRemove(event._id, function(err) {
                            if(err) return done(err);
                            done();
                        });
                    });
                });
        });
    });
});



/**
 * Check to make sure that POST is working properly.
 * POST is used to create new instances of objects in
 * the database, so to properly check that this works,
 * we need to make sure that new data is being created,
 * and that the API rejects requests with invalid data.
 */
describe('POST /api/events', function() {
    it('should create a new event', function(done) {
        // Make sure data is properly being created
        done();
    });

    it('should reject invalid requests', function(done) {
        // Make sure that an invalid input gets rejected
        done();
    });
});



describe('DELETE /api/events', function() {
    it('should delete an element', function(done) {
        // Make sure that DELETE is working
        done();
    });

    it('should not delete elements that do not exist', function(done) {
        // Make sure that you cannot delete an element
        // that does not exist
        done();
    });
});
