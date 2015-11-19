'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('GroupService', function() {
    beforeEach(function() {
        browser.get('/');
    });

    it('should retrieve a list of groups', function() {
        browser.executeAsyncScript(function(callback) {
            var GroupService = angular.element(document.body)
                .injector()
                .get('GroupService');
            GroupService.index({}, function(res) {
                callback(res);
            });
        }).then(function(res) {
            console.log(res);
            expect(res.data).to.be.an('array');
        });
    });
});

