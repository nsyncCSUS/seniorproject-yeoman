'use strict';

angular.module('seniorprojectYoApp')
    .controller('testCtrl', function($http) {

      $http.get('api/search/events').then(function(data){
        console.log(data);
      });

    });
