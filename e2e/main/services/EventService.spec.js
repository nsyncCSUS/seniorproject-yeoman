'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('EventService', function() {
    beforeEach(function() {
        browser.get('/');
    });

    it('should retrieve a list of events', function() {
        browser.executeAsyncScript(function(callback) {
            var EventService = angular.element(document.body)
                .injector()
                .get('EventService');
            EventService.index({}, function(res) {
                callback(res);
            });
        }).then(function(res) {
            console.log(res);
            expect(res.data).to.be.an('array');
        });
    });
});

