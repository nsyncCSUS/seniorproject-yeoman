'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        isFree: true,
        url: '/users',
        templateUrl: 'app/routes/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('users2', {
        isFree: true,
        url: '/users/:userId',
        templateUrl: 'app/routes/users/users.html',
        controller: 'UsersCtrl'
      });
  });
