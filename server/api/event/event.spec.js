'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/events', function() {

    it('should respond with JSON array', function(done) {
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

    it('should retrieve a single element', function(done) {
        // Make sure that retrieving a single element
        // by its id works
        done();
    });
});


/**
 * For put to work, we must check that some element exists
 * in the database, and then update some value for this element
 * and make sure the value was properly updated.
 */
describe('PUT /api/events', function() {
    it('should update an element in the database', function(done) {
        // Make sure that PUT works properly
        /*request(app)
            .put('/api/events/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                done();
         });*/
        done();
    });

    it('should not update elements with invalid fields', function(done) {
        // Make sure data not in schema does not get updated
        done();
    });

    it('should not update elements with null data', function(done) {
        // Make sure that a null request is properly handled
        done();
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