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
            httpBackend.whenGET('/api/events').respond(200, [
                {
                    _id: '000000000000000000000000',
                    name: 'Test Event 1'
                },
                {
                    _id: '000000000000000000000001',
                    name: 'Test Event 2'
                }
            ]);
            EventService.index({}, function(res) {
                expect(res.data).toEqual([
                    {
                        _id: '000000000000000000000000',
                        name: 'Test Event 1'
                    },
                    {
                        _id: '000000000000000000000001',
                        name: 'Test Event 2'
                    }
                ]);
            });
            httpBackend.flush();
        });

        it('should retrieve a single event', function() {
            httpBackend.whenGET('/api/events/000000000000000000000000').respond(200, {
                _id: '000000000000000000000000',
                name: 'Test Event 1'
            });
            EventService.show('000000000000000000000000', function(res) {
                expect(res.data).toEqual({
                    _id: '000000000000000000000000',
                    name: 'Test Event 1'
                });
            });
            httpBackend.flush();
        });

        it('should respond with a 404 for invalid ids', function() {
            httpBackend.whenGET('/api/events/invalid').respond(404);
            EventService.show('invalid', function(res) {
                expect(res.status).toEqual(404);
            });
            httpBackend.flush();
        });
//        it('should update an event', function() {});
//        it('should create an event', function() {});
//        it('should delete an event', function() {});
    });

    describe ('EventService.organizers', function() {
//        it('should retrieve a list of organizers', function() {});
//        it('should retrieve a single organizer', function() {});
//        it('should add a user to an events organizers list', function() {});
//        it('should delete a user from an events organizers lits', function() {});
    });

    describe('EventService.volunteers', function() {
//        it('should retrieve a list of volunteers', function() {});
//        it('should retrieve a single volunteer', function() {});
//        it('should add a user to an events volunteer list', function() {});
//        it('should delete a user from an events volunteer list', function() {});
    });

});
