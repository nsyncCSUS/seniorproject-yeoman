'use strict';

angular.module('seniorprojectYoApp')
  .directive('user', function () {
    return {
      templateUrl: 'app/directives/user/user.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });