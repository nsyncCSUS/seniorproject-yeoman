'use strict';

describe('Service: EventService', function() {

    // load the service's module
    beforeEach(module('seniorprojectYoApp'));

    // instantiate service
    var EventService;
    var httpBackend;
    beforeEach(inject(function(_EventService_, $httpBackend) {
        EventService = _EventService_;
        httpBackend = $httpBackend;
    }));

    it('should do something', function() {
        expect(!!EventService).toBe(true);
    });

    describe('EventService', function() {
        it('should retrieve a list of events', function() {
            var i = 1;
            expect(i).toBe(1);
        });

        it('should retrieve a single event', function() {});
        it('should update an event', function() {});
        it('should create an event', function() {});
        it('should delete an event', function() {});
    });

    describe ('EventService.organizers', function() {
        it('should retrieve a list of organizers', function() {});
        it('should retrieve a single organizer', function() {});
        it('should add a user to an events organizers list', function() {});
        it('should delete a user from an events organizers lits', function() {});
    });

    describe('EventService.volunteers', function() {
        it('should retrieve a list of volunteers', function() {});
        it('should retrieve a single volunteer', function() {});
        it('should add a user to an events volunteer list', function() {});
        it('should delete a user from an events volunteer list', function() {});
    });

});
