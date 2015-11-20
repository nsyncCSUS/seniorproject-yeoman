'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('GroupService', function() {
    beforeEach(function() {
//        browser.get('/');
    });

    it('should retrieve a list of groups', function() {
        browser.executeAsyncScript(function(callback) {
            var GroupService = angular.element(document.body)
                .injector()
                .get('GroupService');
            GroupService.index({}, callback, callback);
        }).then(function(res) {
            expect(res.data).to.be.an('array');
        });
    });

    describe('index', function() {});
    describe('show', function() {});
    describe('update', function() {});
    describe('create', function() {});
    describe('destroy', function() {});


    describe('events', function() {
        describe('index', function() {});
        describe('show', function() {});
        describe('create', function() {});
        describe('destroy', function() {});
    });


    describe('organizers', function() {
        describe('index', function() {});
        describe('show', function() {});
        describe('create', function() {});
        describe('destroy', function() {});
    });


    describe('volunteers', function() {
        describe('index', function() {});
        describe('show', function() {});
        describe('create', function() {});
        describe('destroy', function() {});
    });
});

