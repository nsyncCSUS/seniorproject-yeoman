'use strict';

angular.module('seniorprojectYoApp')
    .factory('GroupFactory', function() {
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
            getAllGroups: function() {
                return $http.get('/api/search/getallgroups');
            },

            getAGroupByID: function(searchValue) {
                return $http.get('/api/search/getagroupbyID/' + searchValue);
            },

            getAGroupByName: function(searchValue) {
                return $http.get('/api/search/getagroupbyname/' + searchValue);
            }
        };
    });