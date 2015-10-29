'use strict';

describe('Service: EventFactory', function () {

  // load the service's module
  beforeEach(module('seniorprojectYoApp'));

  // instantiate service
  var EventFactory;
  beforeEach(inject(function (_EventFactory_) {
    EventFactory = _EventFactory_;
  }));

  it('should do something', function () {
    expect(!!EventFactory).toBe(true);
  });

});
