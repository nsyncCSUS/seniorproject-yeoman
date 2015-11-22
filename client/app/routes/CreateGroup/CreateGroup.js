'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
        .state('CreateGroup', {
            url: '/create/group',
            templateUrl: 'app/routes/CreateGroup/CreateGroup.html',
            controller: 'CreateGroupCtrl'
        })
        .state('CreateGroup2', {
            url: '/users/:userId/create/group',
            templateUrl: 'app/routes/CreateGroup/CreateGroup.html',
            controller: 'CreateGroupCtrl'
        })
        .state('CreateGroup3', {
            url: '/users/:userId/create/group/',
            templateUrl: 'app/routes/CreateGroup/CreateGroup.html',
            controller: 'CreateGroupCtrl'
        });
  });
