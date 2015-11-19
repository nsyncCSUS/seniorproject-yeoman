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
            UserService.index({}, function(res) {
                callback(res);
            });
        }).then(function(res) {
            console.log(res);
            expect(res.data).to.be.an('array');
        });
    });
});

