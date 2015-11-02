'use strict';

angular.module('seniorprojectYoApp')
    .controller('LogoutCtrl', function($scope) {
        $scope.message = 'Hello';


        $scope.logout = function() {
            console.log(window.sessionStorage);
            window.sessionStorage.clear();
            console.log(window.sessionStorage);
            LoginService.isLogged = false;
        };

        $scope.$on('$viewContentLoaded', function() {
            $scope.logout();
            console.log("User logged out");
        });

    });