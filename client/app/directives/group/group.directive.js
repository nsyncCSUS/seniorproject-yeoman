'use strict';

angular.module('seniorprojectYoApp')
  .directive('group', function () {
    return {
      templateUrl: 'app/directives/group/group.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });