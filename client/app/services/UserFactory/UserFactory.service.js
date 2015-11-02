'use strict';

angular.module('seniorprojectYoApp')
    .factory('UserFactory', function() {
        // Service logic
        // ...

        var meaningOfLife = 42;

        // Public API here
        return {
            //someMethod: function () {
            //  return meaningOfLife;
            //},

            // Note: parameters in post have to be an object
            // Also name in search.js route uses searchString as name
            getAllUsers: function() {
                return $http.get('/api/search/getallusers');
            },

            getAUserByID: function(searchValue) {
                return $http.get('/api/search/getauserbyID/' + searchValue);
            },

            getAUserByName: function(searchValue) {
                console.log('inside getAUserByName');
                return $http.get('/api/search/getauserbyname/' + searchValue);
            }
        };
    });