'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('CreateGroup', {
        url: '/create/group',
        templateUrl: 'app/routes/CreateGroup/CreateGroup.html',
        controller: 'CreateGroupCtrl'
      });
  });
