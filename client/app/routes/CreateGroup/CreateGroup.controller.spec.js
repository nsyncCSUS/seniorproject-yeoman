'use strict';

describe('Controller: CreateGroupCtrl', function () {

  // load the controller's module
  beforeEach(module('seniorprojectYoApp'));
  beforeEach(module('angularMoment'));

  var CreateGroupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateGroupCtrl = $controller('CreateGroupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
