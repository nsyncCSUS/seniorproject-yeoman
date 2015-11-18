'use strict';

describe('Service: UserService', function() {

    // load the service's module
    beforeEach(module('seniorprojectYoApp'));

    // instantiate service
    var UserService;
    var httpBackend;
    beforeEach(inject(function(_UserService_, $httpBackend) {
        UserService = _UserService_;
        httpBackend = $httpBackend;
    }));

    it('should do something', function() {
        expect(!!UserService).toBe(true);
    });


    describe('UserService', function() {
//        it('should retrieve a list of users', function() {});
//        it('should retrieve a single user', function() {});
//        it('should update a user', function() {});
//        it('should create a new user', function() {});
//        it('should delete a user', function() {});
    });


    describe('UserService.events', function() {
        describe('UserService.events.creatorOf', function() {
//            it('should retrieve a list of events', function() {});
//            it('should retrieve a single event', function() {});
        });

        describe('UserService.events.organizerOf', function() {
//            it('should retrieve a list of events', function() {});
//            it('should retrieve a single event', function() {});
//            it('should add an event to a users organizerOf list', function() {});
//            it('should delete an event from a users organizerOf list', function() {});
        });

        describe('UserService.events.volunteeredTo', function() {
//            it('should retrieve a list of events', function() {});
//            it('should retrieve a single event', function() {});
//            it('should add an event to a users volunteeredTo list', function() {});
//            it('should delete an event from a users volunteeredTo list', function() {});
        });
    });

    describe('UserService.groups', function() {
        describe('UserService.groups.creatorOf', function() {
//            it('should retrieve a list of groups', function() {});
//            it('should retrieve a single group', function() {});
        });

        describe('UserService.groups.organizerOf', function() {
//            it('should retrieve a list of groups', function() {});
//            it('should retrieve a single group', function() {});
//            it('should add a group to a users organizerOf list', function() {});
//            it('should delete a group from a users organizerOf list', function() {});
        });

        describe('UserService.groups.volunteeredTo', function() {
//            it('should retrieve a list of groups', function() {});
//            it('should retrieve a single group', function() {});
//            it('should add a group to a users volunteeredTo list', function() {});
//            it('should delete a group from a users volunteeredTo list', function() {});
        });
    });
});
