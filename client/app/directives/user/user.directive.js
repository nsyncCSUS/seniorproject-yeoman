'use strict';

angular.module('seniorprojectYoApp')
    .directive('userCard', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/group/userCard.html'
        };
    });
