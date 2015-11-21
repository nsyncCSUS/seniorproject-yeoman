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
        it('should retrieve a single user', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.show('000000000000000000000002', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data.user).to.exist;
                expect(res.data.user._id).to.equal('000000000000000000000002');
            });
        });

        it('should respond with a 404 for non-existent users', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.show('123456789012345678901234', {}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.show('invalid', {}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('update', function() {
        it('should update a user', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.update('000000000000000000000002', {firstName: 'Something'}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(200);
                expect(res.data.user).to.exist;
                expect(res.data.user.firstName).to.equal('Something');
            });
        });

        it('should respond with a 404 for non-existent users', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.update('123456789012345678901234', {firstName: 'Something'}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.update('invalid', {firstName: 'Something'}, callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });


    describe('destroy', function() {
        it('should delete a user', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.destroy('000000000000000000000003', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(204);
            });
        });

        it('should respond with a 404 for non-existent users', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.destroy('123456789012345678901234', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(204);
            });
        });

        it('should reject invalid ids', function() {
            browser.executeAsyncScript(function(callback) {
                var UserService = angular.element(document.body)
                    .injector()
                    .get('UserService');
                UserService.destroy('invalid', callback, callback);
            }).then(function(res) {
                expect(res.status).to.equal(404);
            });
        });
    });



    describe('events', function() {
        describe('creatorOf', function() {
            describe('index', function() {
                it('should retrieve a list of events', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.creatorOf.index('000000000000000000000002', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.creatorOf.index('123456789012345678901234', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.creatorOf.index('invalid', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });

            describe('show', function() {
                it('should retrieve a single event', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.creatorOf.show('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.event).to.exist;
                        expect(res.data.event._id).to.equal('000000000000000000000000');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.creatorOf.show('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.creatorOf.show('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });
        });


        describe('organizerOf', function() {
            describe('index', function() {
                it('should retrieve a list of events', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.index('000000000000000000000002', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.index('123456789012345678901234', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.index('invalid', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('show', function() {
                it('should retrieve a single event', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.show('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.event).to.exist;
                        expect(res.data.event._id).to.equal('000000000000000000000000');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.show('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.show('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('create', function() {
                it('should add a user to an events organizer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.create('000000000000000000000002', '000000000000000000000001', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000001';
                        });
                        expect(items.length).to.equal(1);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.create('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.create('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('destroy', function() {
                it('should remove a user from an events organizer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.destroy('000000000000000000000002', '000000000000000000000001', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000001';
                        });
                        expect(items.length).to.equal(0);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.destroy('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.organizerOf.destroy('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });
        });


        describe('volunteeredTo', function() {
            describe('index', function() {
                it('should retrieve a list of events', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.index('000000000000000000000002', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.index('123456789012345678901234', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.index('invalid', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('show', function() {
                it('should retrieve a single event', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.show('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.event).to.exist;
                        expect(res.data.event._id).to.equal('000000000000000000000000');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.show('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.show('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('create', function() {
                it('should add a user to an events volunteer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.create('000000000000000000000002', '000000000000000000000001', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000001';
                        });
                        expect(items.length).to.equal(1);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.create('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.create('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('destroy', function() {
                it('should remove a user from an events volunteer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.destroy('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000000';
                        });
                        expect(items.length).to.equal(0);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.destroy('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.events.volunteeredTo.destroy('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });
        });
    });


    describe('groups', function() {
        describe('creatorOf', function() {
            describe('index', function() {
                it('should retrieve a list of groups', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.creatorOf.index('000000000000000000000002', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.creatorOf.index('123456789012345678901234', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.creatorOf.index('invalid', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('show', function() {
                it('should retrieve a single group', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.creatorOf.show('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.group).to.exist;
                        expect(res.data.group._id).to.equal('000000000000000000000000');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.creatorOf.show('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.creatorOf.show('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });
        });


        describe('organizerOf', function() {
            describe('index', function() {
                it('should retrieve a list of groups', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.index('000000000000000000000002', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.index('123456789012345678901234', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.index('invalid', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('show', function() {
                it('should retrieve a single group', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.show('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.group).to.exist;
                        expect(res.data.group._id).to.equal('000000000000000000000000');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.show('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.show('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('create', function() {
                it('should add a user to a groups organizer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.create('000000000000000000000002', '000000000000000000000001', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000001';
                        });
                        expect(items.length).to.equal(1);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.create('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.create('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('destroy', function() {
                it('should remove a user from a groups organizer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.destroy('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000000';
                        });
                        expect(items.length).to.equal(0);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.destroy('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.organizerOf.destroy('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });
        });


        describe('volunteeredTo', function() {
            describe('index', function() {
                it('should retrieve a list of groups', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.index('000000000000000000000002', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.index('123456789012345678901234', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.index('invalid', {}, callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('show', function() {
                it('should retrieve a single group', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.show('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.group).to.exist;
                        expect(res.data.group._id).to.equal('000000000000000000000000');
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.show('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.show('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('create', function() {
                it('should add a user to a groups volunteer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.create('000000000000000000000002', '000000000000000000000001', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000001';
                        });
                        expect(items.length).to.equal(1);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.create('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.create('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });


            describe('destroy', function() {
                it('should remove a user from a groups volunteer list', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.destroy('000000000000000000000002', '000000000000000000000000', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(200);
                        expect(res.data).to.be.an('array');
                        var items = res.data.filter(function(item) {
                            return item._id === '000000000000000000000000';
                        });
                        expect(items.length).to.equal(0);
                    });
                });

                it('should respond with a 404 for non-existent users', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.destroy('000000000000000000000002', '123456789012345678901234', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });

                it('should reject invalid ids', function() {
                    browser.executeAsyncScript(function(callback) {
                        var UserService = angular.element(document.body)
                            .injector()
                            .get('UserService');
                        UserService.groups.volunteeredTo.destroy('000000000000000000000002', 'invalid', callback, callback);
                    }).then(function(res) {
                        expect(res.status).to.equal(404);
                    });
                });
            });
        });
    });
});

