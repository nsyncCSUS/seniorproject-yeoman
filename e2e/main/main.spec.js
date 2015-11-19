'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('Main View', function() {
    var page;

    beforeEach(function() {
      browser.get('/');
      page = require('./main.po');
    });


    it('should include jumbotron with correct data', function() {
        expect(1).to.equal(0);
    });


    it('something else', function() {
        expect(2).to.equal(2);
        browser.executeAsyncScript(function(callback) {
            var UserService = angular.element(document.body)
                .injector()
                .get('UserService');
            UserService.index({}, function(res) {
                assert(1).toEqual(1);
                callback(res);
            });
        }).then(function(output) {
            console.log(output);
        });
    });
});
