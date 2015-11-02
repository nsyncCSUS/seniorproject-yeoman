'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('CreateEvent', {
        url: '/create/event',
        templateUrl: 'app/routes/CreateEvent/CreateEvent.html',
        controller: 'CreateEventCtrl'
      });
  });
