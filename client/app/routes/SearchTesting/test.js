'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'app/routes/SearchTesting/test.html',
        controller: 'testCtrl'
      });
  });
