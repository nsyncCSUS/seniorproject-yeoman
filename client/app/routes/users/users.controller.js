'use strict';

angular.module('seniorprojectYoApp')
    .controller('UsersCtrl', function($scope) {
        $scope.message = 'Hello';

        $scope.userId = $routeParams.userId;

        function refresh() {
            // Problematic code
            //UserService.get('/users').success(function test(response)
            //{
            console.log("I got the data");
            //});
        };
        refresh();

    });