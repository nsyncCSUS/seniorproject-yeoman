'use strict';

describe('Service: GroupService', function() {

    // load the service's module
    beforeEach(module('seniorprojectYoApp'));

    // instantiate service
    var GroupService;
    var httpBackend;
    beforeEach(inject(function(_GroupService_, $httpBackend) {
        GroupService = _GroupService_;
        httpBackend = $httpBackend;
    }));

    it('should do something', function() {
        expect(!!GroupService).toBe(true);
    });

    describe('GroupService', function() {
//        it('should retrieve a list of groups', function() {});
//        it('should retrieve a single group', function() {});
//        it('should update a group', function() {});
//        it('should create a group', function() {});
//        it('should delete a group', function() {});
    });

    describe('GroupService.events', function() {
//        it('should retrieve a list of events', function() {});
//        it('should retrieve a single event', function() {});
//        it('should create an event', function() {});
//        it('should delete an event', function() {});
    });

    describe('GroupService.organizers', function() {
//        it('should retrieve a list of organizers', function() {});
//        it('should retrieve a single organizers', function() {});
//        it('should add a user to a groups organizers list', function() {});
//        it('should delete a user froma  groups organizers list', function() {});
    });

    describe('GroupService.volunteers', function() {
//        it('should retrieve a list of volunteers', function() {});
//        it('should retrieve a single volunteer', function() {});
//        it('should add a user to a groups volunteer list', function() {});
//        it('should delete a user from a groups volunteer list', function() {});
    });
});
