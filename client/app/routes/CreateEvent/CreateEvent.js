'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
        .state('CreateEvent', {
            url: '/create/event',
            templateUrl: 'app/routes/CreateEvent/CreateEvent.html',
            controller: 'CreateEventCtrl'
        })
        .state('CreateEvent2', {
            url: '/groups/:groupId/create/event',
            templateUrl: 'app/routes/CreateEvent/CreateEvent.html',
            controller: 'CreateEventCtrl'
        })
        .state('CreateEvent3', {
            url: '/groups/:groupId/create/event/',
            templateUrl: 'app/routes/CreateEvent/CreateEvent.html',
            controller: 'CreateEventCtrl'
        });
  });
