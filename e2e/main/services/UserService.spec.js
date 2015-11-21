'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('UserService', function() {
    beforeEach(function() {
//        browser.get('/');
    });



    describe('index', function() {
        it('should retrieve a list of users', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.index({}, callback, callback);
            }).then(function(res) {
                expect(res.data).to.be.an('array');
            });
        });
    });


    describe('show', function() {
        it('should retrieve a single user', function() {});
        it('should respond with a 404 for non-existent users', function() {});
        it('should reject invalid ids', function() {});
    });


    describe('update', function() {
        it('should update a user', function() {});
        it('should respond with a 404 for non-existent users', function() {});
        it('should reject invalid ids', function() {});
    });


    describe('destroy', function() {
        it('should delete a user', function() {});
        it('should respond with a 404 for non-existent users', function() {});
        it('should reject invalid ids', function() {});
    });


    describe('events', function() {
        describe('creatorOf', function() {
            describe('index', function() {
                it('should retrieve a list of events', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('show', function() {
                it('should retrieve a single event', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });
        });


        describe('organizerOf', function() {
            describe('index', function() {
                it('should retrieve a list of events', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('show', function() {
                it('should retrieve a single event', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('create', function() {
                it('should add a user to an events organizer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('destroy', function() {
                it('should remove a user from an events organizer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });
        });


        describe('volunteeredTo', function() {
            describe('index', function() {
                it('should retrieve a list of events', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('show', function() {
                it('should retrieve a single event', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('create', function() {
                it('should add a user to an events volunteer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('destroy', function() {
                it('should remove a user from an events volunteer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });
        });
    });


    describe('groups', function() {
        describe('creatorOf', function() {
            describe('index', function() {
                it('should retrieve a list of groups', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('show', function() {
                it('should retrieve a single group', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });
        });


        describe('organizerOf', function() {
            describe('index', function() {
                it('should retrieve a list of groups', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('show', function() {
                it('should retrieve a single group', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('create', function() {
                it('should add a user to a groups organizer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('destroy', function() {
                it('should remove a user from a groups organizer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });
        });


        describe('volunteeredTo', function() {
            describe('index', function() {
                it('should retrieve a list of groups', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('show', function() {
                it('should retrieve a single group', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('create', function() {
                it('should add a user to a groups volunteer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });

            describe('destroy', function() {
                it('should remove a user from a groups volunteer list', function() {});
                it('should respond with a 404 for non-existent users', function() {});
                it('should reject invalid ids', function() {});
            });
        });
    });
});

