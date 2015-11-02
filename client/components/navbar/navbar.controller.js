'use strict';

angular.module('seniorprojectYoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
        'title': 'Dashboard',
        'link': '/dashboard'
    }, {
        'title': 'Users',
        'link': '/users'
    }, {
        'title': 'Groups',
        'link': '/groups'
    }, {
        'title': 'Events',
        'link': '/events'
    }, {
        'title': 'Create Group',
        'link': '/create/group'
    }, {
        'title': 'Create Event',
        'link': '/create/event'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
