'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('EventService', function() {
    beforeEach(function() {
        browser.get('/');
    });



    describe('index', function() {
        it('should retrieve a list of events', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.index({}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data).to.be.an('array');
            });
        });
    });


    describe('show', function() {
        it('should retrieve a single event', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.show('000000000000000000000000', callback, callback);
            }).then(function(res) {
                var event = res.data.event;
                expect(res.status).to.equal(200);
                expect(event._id).to.equal('000000000000000000000000');
            });
        });

        it('should return 404 for non-existent events', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.show('123456789012345678901234', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

//        it('should reject invalid ids', function() {});
    });


//    describe('update', function() {
//        it('should update a user', function() {});
//        it('should not update fields that dont exist', function() {});
//        it('should return a 404 for non-existent events', function() {});
//        it('should reject invalid ids', function() {});
//    });
//
//
//    describe('destroy', function() {
//        it('should delete an event', function() {});
//        it('should return a 404 for non-existent events', function() {});
//        it('should reject invalid ids', function() {});
//    });
//
//
//    describe('organizers', function() {
//        describe('index', function() {
//            it('should return a list of organizers', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//
//        describe('show', function() {
//            it('should get an organizers', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//
//        describe('create', function() {
//            it('should add an organizer to an events organizer list', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//
//        describe('destroy', function() {
//            it('should remove an organizer', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//    });
//
//
//    describe('volunteers', function() {
//        describe('index', function() {
//            it('should return a list of volunteers', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//
//        describe('show', function() {
//            it('should get a volunteer', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//
//        describe('create', function() {
//            it('should add a volunteer to the list of volunteers', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//
//        describe('destroy', function() {
//            it('should remove a volunteer from the volunteer list', function() {});
//            it('should return a 404 for non-existent events', function() {});
//            it('should reject invalid ids', function() {});
//        });
//    });
});
















