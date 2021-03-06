'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('groups', {
        url: '/groups',
        templateUrl: 'app/routes/groups/groups.html',
        controller: 'GroupsCtrl'
      })
      .state('groups2', {
        url: '/groups/:groupId',
        templateUrl: 'app/routes/groups/groups.html',
        controller: 'GroupsCtrl'
      })
      .state('groups3', {
        url: '/groups/:groupId/',
        templateUrl: 'app/routes/groups/groups.html',
        controller: 'GroupsCtrl'
      });
  });
