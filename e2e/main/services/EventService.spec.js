'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('EventService', function() {

    beforeEach(function() {});


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

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.show('invalid', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('update', function() {
        it('should update a user', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.update('000000000000000000000000', {name: 'Something'}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data.event.name).to.equal('Something');
            });
        });

        it('should not update fields that dont exist', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.update('000000000000000000000000', {
                    invalid: 'Something invalid'
                }, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data.event).to.exist;
                expect(res.data.event.invalid).to.not.exist;
            });
        });

        it('should return a 404 for non-existent events', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.update('123456789012345678901234', {}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.update('invalid', {}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('destroy', function() {
//        it('should delete an event', function() {
//            browser.executeAsyncScript(function(callback) {
//                var EventService = angular.element(document.body)
//                    .injector()
//                    .get('EventService');
//                EventService.destroy('000000000000000000000000', callback, callback);
//            }).then(function(res) {
//                expect(res.status).to.equal(204);
//            });
//        });

        it('should return a 404 for non-existent events', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.destroy('123456789012345678901234', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var EventService = angular.element(document.body)
                    .injector()
                    .get('EventService');
                EventService.destroy('invalid', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('organizers', function() {
        describe('index', function() {
            it('should return a list of organizers', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.index('000000000000000000000000', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.index('123456789012345678901234', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.index('invalid', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('show', function() {
            it('should get an organizers', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.show('000000000000000000000000', '000000000000000000000002', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data.organizer).to.exist;
                    expect(res.data.organizer._id).to.equal('000000000000000000000002');
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.show('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.show('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('create', function() {
            it('should add an organizer to an events organizer list', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.create('000000000000000000000000', '000000000000000000000002', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                    var items = res.data.filter(function(item) {
                        return item._id === '000000000000000000000002';
                    });
                    expect(items.length).to.equal(1);
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.create('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.create('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('destroy', function() {
            it('should remove an organizer', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.destroy('000000000000000000000000', '000000000000000000000002', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                    var items = res.data.filter(function(item) {
                        return item._id === '000000000000000000000002';
                    });
                    expect(items.length).to.equal(0);
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.destroy('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.organizers.destroy('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });
    });


    describe('volunteers', function() {
        describe('index', function() {
            it('should return a list of volunteers', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.index('000000000000000000000000', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.index('123456789012345678901234', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.index('invalid', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('show', function() {
            it('should get a volunteer', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.show('000000000000000000000000', '000000000000000000000002', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data.volunteer).to.exist;
                    expect(res.data.volunteer._id).to.equal('000000000000000000000002');
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.show('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.show('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('create', function() {
            it('should add a volunteer to the list of volunteers', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.create('000000000000000000000000', '000000000000000000000003', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                    var items = res.data.filter(function(item) {
                        return item._id === '000000000000000000000003';
                    });
                    expect(items.length).to.equal(1);
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.create('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.create('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('destroy', function() {
            it('should remove a volunteer from the volunteer list', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.destroy('000000000000000000000000', '000000000000000000000002', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                    var items = res.data.filter(function(item) {
                        return item._id === '000000000000000000000002';
                    });
                    expect(items.length).to.equal(0);
                });
            });

            it('should return a 404 for non-existent events', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.destroy('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var EventService = angular.element(document.body)
                        .injector()
                        .get('EventService');
                    EventService.volunteers.destroy('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });
    });
});
















