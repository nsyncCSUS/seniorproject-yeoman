'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
        .state('Dashboard', {
            url: '/dashboard',
            templateUrl: 'app/routes/Dashboard/Dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('Dashboard2', {
            url: '/dashboard/',
            templateUrl: 'app/routes/Dashboard/Dashboard.html',
            controller: 'DashboardCtrl'
        });
  });
