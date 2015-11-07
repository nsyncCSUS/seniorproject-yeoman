'use strict';

angular.module('seniorprojectYoApp')
    .controller('SignupCtrl', function($scope, $http) {
        $scope.message = 'Hello';

        $scope.register = function() {
            console.log($scope.user.username);
            console.log($scope.user.password);

            // routes/users.js : passes the scope.user(from angular) object into the http post
            // when the post sends back the repsonse .then function(promise) triggers and tests if the response was a success
            // if is was the .then function is called. If the response sent back from the http.post failed or gave error the
            // errorCallBack function will be envoked
            $http.post('/api/users/createuser', $scope.user)
                .then(function(response) {
                    console.log(response);
                    console.log('promise');
                    console.log(response.status);
                    if (response.status === 200) {
                        $location.path('/login');
                    }
                }, function errorCallBack(response) {
                    console.log('signup failed errocallback angular');
                    console.log(response);
                    // TODO: some form of error to tell user that the operation failed

                    //$location.path('/signup');
                    // redirects user to login after registration completes

                });
        };
    });
