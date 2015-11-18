'use strict';

describe('Filter: CheckExpired', function () {

  // load the filter's module
  beforeEach(module('seniorprojectYoApp'));

  // initialize a new instance of the filter before each test
  var CheckExpired;
  beforeEach(inject(function ($filter) {
    CheckExpired = $filter('CheckExpired');
  }));

  it('should return the input prefixed with "CheckExpired filter:"', function () {
    var text = 'angularjs';
//    expect(CheckExpired(text)).toBe('CheckExpired filter: ' + text);
  });

});
