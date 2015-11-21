'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('GroupService', function() {
    beforeEach(function() {
//        browser.get('/');
    });


    describe('index', function() {
        it('should retrieve a list of groups', function() {
            browser.executeAsyncScript(function(callback) {
                var GroupService = angular.element(document.body)
                    .injector()
                    .get('GroupService');
                GroupService.index({}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data).to.be.an('array');
            });
        });
    });


    describe('show', function() {
        it('should retrieve a single group', function() {
            browser.executeAsyncScript(function(callback) {
                var GroupService = angular.element(document.body)
                    .injector()
                    .get('GroupService');
                GroupService.show('000000000000000000000000', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data.group).to.exist;
                expect(res.data.group._id).to.equal('000000000000000000000000');
            });
        });

        it('should respond with a 404 for non-existent groups', function() {
            browser.executeAsyncScript(function(callback) {
                var GroupService = angular.element(document.body)
                    .injector()
                    .get('GroupService');
                GroupService.show('123456789012345678901234', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var GroupService = angular.element(document.body)
                    .injector()
                    .get('GroupService');
                GroupService.show('invalid', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('update', function() {
        it('should update a group', function() {});

        it('should respond with a 404 for non-existent groups', function() {});

        it('should reject invalid ids', function() {});
    });


//    describe('create', function() {
//        it('should create a new group', function() {});
//        it('should respond with a 404 for non-existent groups', function() {});
//        it('should reject invalid ids', function() {});
//    });


    describe('destroy', function() {
//        it('should delete a group', function() {
//            browser.executeAsyncScript(function(callback) {
//                var GroupService = angular.element(document.body)
//                    .injector()
//                    .get('GroupService');
//                GroupService.destroy('000000000000000000000002', callback, callback);
//            }).then(function(res) {
//                expect(res.status).to.equal(204);
//            });
//        });

        it('should respond with a 404 for non-existent groups', function() {
            browser.executeAsyncScript(function(callback) {
                var GroupService = angular.element(document.body)
                    .injector()
                    .get('GroupService');
                GroupService.destroy('123456789012345678901234', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var GroupService = angular.element(document.body)
                    .injector()
                    .get('GroupService');
                GroupService.destroy('invalid', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('events', function() {
        describe('index', function() {
            it('should retrieve a list of events', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.index('000000000000000000000000', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                });
            });

            it('should respond with a 404 for non-existent groups', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.index('123456789012345678901234', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.index('invalid', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });

        describe('show', function() {
            it('should retrieve a single event', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.show('000000000000000000000000', '000000000000000000000000', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data.event).to.exist;
                    expect(res.data.event._id).to.equal('000000000000000000000000');
                });
            });

            it('should respond with a 404 for non-existent groups', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.show('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.show('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });

//        describe('create', function() {
//            it('should create a new event', function() {});
//            it('should respond with a 404 for non-existent groups', function() {});
//            it('should reject invalid ids', function() {});
//        });

        describe('destroy', function() {
            it('should delete an event', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.destroy('000000000000000000000000', '000000000000000000000000', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                });
            });

            it('should respond with a 404 for non-existent groups', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.destroy('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.events.destroy('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });
    });


    describe('organizers', function() {
        describe('index', function() {
            it('should retrieve a list of organizers', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.index('000000000000000000000000', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                });
            });

            it('should respond with a 404 for non-existent groups', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.index('123456789012345678901234', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.index('invalid', {}, callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('show', function() {
            it('should retrieve a single organizer', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.show('000000000000000000000000', '000000000000000000000002', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data.organizer).to.exist;
                    expect(res.data.organizer._id).to.equal('000000000000000000000002');
                });
            });

            it('should respond with a 404 for non-existent groups', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.show('000000000000000000000000', '123456789012345678901234', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });

            it('should reject invalid ids', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.show('000000000000000000000000', 'invalid', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(404);
                });
            });
        });


        describe('create', function() {
            it('should add an organizer to a groups organizers list', function() {
                browser.executeAsyncScript(function(callback) {
                    var GroupService = angular.element(document.body)
                        .injector()
                        .get('GroupService');
                    GroupService.organizers.create('000000000000000000000000', '000000000000000000000003', callback, callback);
                }).then(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.data).to.be.an('array');
                    var items = res.data.filter(function(item) {
                        return item._id === '000000000000000000000003';
                    });
                    expect(items.length).to.equal(1);
                });
            });

            it('should respond with a 404 for non-existent groups', function() {});

            it('should reject invalid ids', function() {});
        });


        describe('destroy', function() {
            it('should remove an organizer from a groups organizers list', function() {});

            it('should respond with a 404 for non-existent groups', function() {});

            it('should reject invalid ids', function() {});
        });
    });


    describe('volunteers', function() {
        describe('index', function() {
            it('should retrieve a list of volunteers', function() {});
            it('should respond with a 404 for non-existent groups', function() {});
            it('should reject invalid ids', function() {});
        });


        describe('show', function() {
            it('should retrieve a single volunteer', function() {});
            it('should respond with a 404 for non-existent groups', function() {});
            it('should reject invalid ids', function() {});
        });


        describe('create', function() {
            it('should add a volunteer to a groups volunteers list', function() {});
            it('should respond with a 404 for non-existent groups', function() {});
            it('should reject invalid ids', function() {});
        });


        describe('destroy', function() {
            it('should remove a volunteer from a groups volunteers list', function() {});
            it('should respond with a 404 for non-existent groups', function() {});
            it('should reject invalid ids', function() {});
        });
    });
});

