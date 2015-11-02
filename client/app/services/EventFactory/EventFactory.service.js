'use strict';

angular.module('seniorprojectYoApp')
    .factory('EventFactory', function() {
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
            getAllEvents: function() {
                return $http.get('/api/search/getallevents');
            },

            getAEventByID: function(searchValue) {
                return $http.get('/api/search/getaeventbyID/' + searchValue);
            },

            getAEventByName: function(searchValue) {
                return $http.get('/api/search/getaeventbyname/' + searchValue);
            }
        };
    });