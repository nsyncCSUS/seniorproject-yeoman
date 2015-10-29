'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('groups', {
        url: '/groups',
        templateUrl: 'app/routes/groups/groups.html',
        controller: 'GroupsCtrl'
      });
  });