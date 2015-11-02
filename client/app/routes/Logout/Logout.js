'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Logout', {
        url: '/logout',
        templateUrl: 'app/routes/Logout/Logout.html',
        controller: 'LogoutCtrl'
      });
  });