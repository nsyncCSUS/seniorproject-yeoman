'use strict';

angular.module('seniorprojectYoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'app/routes/events/events.html',
        controller: 'EventsCtrl'
      })
      .state('events2', {
        url: '/events/:id',
        templateUrl: 'app/routes/events/events.html',
        controller: 'EventsCtrl'
      });
  });
