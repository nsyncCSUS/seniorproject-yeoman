'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Login', {
        url: '/login',
        templateUrl: 'app/routes/Login/Login.html',
        controller: 'LoginCtrl'
      });
  });