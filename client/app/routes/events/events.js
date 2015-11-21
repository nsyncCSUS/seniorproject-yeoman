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
        url: 'events/:eventId',
        templateUrl: 'app/routes/events/events.html',
        controller: 'EventsCtrl'
      })
      .state('events3', {
        url: '/groups/:groupId/events/:eventId',
        templateUrl: 'app/routes/events/events.html',
        controller: 'EventsCtrl'
      });
  });
