'use strict';

angular.module('seniorprojectYoApp')
  .directive('event', function () {
    return {
      templateUrl: 'app/directives/event/event.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });