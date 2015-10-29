'use strict';

describe('Service: GroupFactory', function () {

  // load the service's module
  beforeEach(module('seniorprojectYoApp'));

  // instantiate service
  var GroupFactory;
  beforeEach(inject(function (_GroupFactory_) {
    GroupFactory = _GroupFactory_;
  }));

  it('should do something', function () {
    expect(!!GroupFactory).toBe(true);
  });

});
