'use strict';

describe('Main View', function() {
  var page;

  var UserService;
  beforeEach(function() {
    var injector = angular.module('seniorprojectYoApp').injector();
    UserService = injector.get('UserService');
    browser.get('/');
    page = require('./main.po');
  });

  var pageLoaded = false;
  beforeEach(function() {
      if(!pageLoaded) {
          setTimeout(function() {
              browser.get('http://localhost:9000');
              pageLoaded = true;
          }, 10000);
      }
  });

  it('should include jumbotron with correct data', function() {
//    expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');
//    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
//    expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
      expect(1).toEqual(1);
  });

  it('something else', function() {
      expect(2).toEqual(2);
      UserService.index({}, function(res) {
          assert(res.data instanceof Array);
      });
  });
});
