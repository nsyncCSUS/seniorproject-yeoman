'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Signup', {
        url: '/signup',
        templateUrl: 'app/routes/Signup/Signup.html',
        controller: 'SignupCtrl'
      });
  });