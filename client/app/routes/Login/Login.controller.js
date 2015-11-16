'use strict';

angular.module('seniorprojectYoApp')
    .controller('LoginCtrl', function($scope, $http) {
        $scope.message = 'Hello';

        // problem with this method causes aysnc problems resulting odd return object
        // it returns an object called d inside of d.$$state.value.data holds the object
        // that is need (post data)
        //  $scope.userObject = UserFactory.getAllUsers();
        //$scope.userObject = UserFactory.getAUserByName('1');



        // Example of getting DB data
        //Creates a userFactory calls a specific function
        // and it returns the name i specified and places it into $scope.userObject.

        /*
   UserFactory.getAUserByName('1').then(function(data){
       console.log(data.data[0]);
    $scope.userObject = data.data[0];
  });*/

        /* test for all users
  UserFactory.getAllUsers().then(function(data){
      console.log(data.data[0]);
   $scope.userObject = data.data[0];
 });



*/

        //$http.get('/api/search/getagroup/3');

        // upload later on form submit or something similar
        $scope.submit = function() {
            console.log('testasdf');
            if (form.file.$valid && $scope.file && !$scope.file.$error) {

                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function(file) {
            console.log($scope.myForm);
            console.log(file);
            Upload.upload({
                url: '/api/users/upload', // which route to post
                fields: {
                    'username': 'test' // any fields you would like specified
                },
                file: file // the actual image file being passed
            }).progress(function(evt) { // Useful debugging lines
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status, headers, config) {
                console.log('Http status: ' + status);
            });
            //once the upload has completed these 3 lines clear the form fields
            $scope.picFile = null;
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        };
        // same concept from signupcontroller.js useing promises if success .then used if failed errocallback used
        $scope.login = function() {
            $http.post('/api/users/login', $scope.user)
                .then(function(response) {
                    console.log(response);
                    $window.sessionStorage.token = response.data.token;
                    console.log($window.sessionStorage);
                    $location.path('/home');
                    LoginService.isLogged = 'True';
                }, function errorCallBack(response) {
                    console.log('Login failed call back angular');
                    console.log(response);
                    //TODO: add some kind of ng-show error message to tell user login failed
                });
        };

        // needed to pass params you cannot pass data in a get but angular has work around
        /*
        $http({
            url: user.details_path,
            method: "GET",
            params: {user_id: user.id}
         });
         */
        //Note: put the params into url encoded you have to decode to extract also its a string
        // Note: http.post will only accept objets not strings
        // HL: anything passed into the jade file angular function will appear in req or
        // You can use $scope since all objects created in jade will also be in thier
        $scope.testAuth = function(req) {
            console.log('controller');
            // Have to convert object to string since post require objects
            $scope.objectify = {
                searchString: $scope.test
            };

            $http.post('/api/search/regex', $scope.objectify);

        };

        $scope.testAuth2 = function() {
            console.log('testAuth2');
            console.log($scope.userObject);
            //  $http.post('/api/users/');

        };

        $scope.testAuth3 = function() {
            console.log('testAuth2');
            $scope.hello = {
                name: "Boaz"
            };
            $http.post('/api/users/test', $scope.hello);

        };

    });
