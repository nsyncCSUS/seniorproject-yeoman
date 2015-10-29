'use strict';

describe('Directive: group', function () {

  // load the directive's module and view
  beforeEach(module('seniorprojectYoApp'));
  beforeEach(module('app/directives/group/group.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<group></group>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the group directive');
  }));
});