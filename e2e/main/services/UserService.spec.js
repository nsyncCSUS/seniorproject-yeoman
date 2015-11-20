'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('UserService', function() {
    beforeEach(function() {
        browser.get('/');
    });

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

    describe('index', function() {});
    describe('show', function() {});
    describe('update', function() {});
    describe('destroy', function() {});

    describe('events', function() {
        describe('creatorOf', function() {
            describe('index', function() {});
            describe('show', function() {});
        });

        describe('organizerOf', function() {
            describe('index', function() {});
            describe('show', function() {});
            describe('create', function() {});
            describe('destroy', function() {});
        });

        describe('volunteeredTo', function() {
            describe('index', function() {});
            describe('show', function() {});
            describe('create', function() {});
            describe('destroy', function() {});
        });
    });


    describe('groups', function() {
        describe('creatorOf', function() {
            describe('index', function() {});
            describe('show', function() {});
        });

        describe('organizerOf', function() {
            describe('index', function() {});
            describe('show', function() {});
            describe('create', function() {});
            describe('destroy', function() {});
        });

        describe('volunteeredTo', function() {
            describe('index', function() {});
            describe('show', function() {});
            describe('create', function() {});
            describe('destroy', function() {});
        });
    });
});

