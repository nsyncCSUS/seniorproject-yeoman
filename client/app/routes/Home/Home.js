'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Home', {
        url: '/home',
        templateUrl: 'app/routes/Home/Home.html',
        controller: 'HomeCtrl'
      });
  });