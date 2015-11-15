'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/routes/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('users2', {
        url: '/users/:id',
        templateUrl: 'app/routes/users/users.html',
        controller: 'UsersCtrl'
      });
  });
