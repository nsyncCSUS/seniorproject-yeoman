'use strict';

describe('Directive: event', function () {

  // load the directive's module and view
  beforeEach(module('seniorprojectYoApp'));
  beforeEach(module('app/directives/event/event.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<event></event>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the event directive');
  }));
});