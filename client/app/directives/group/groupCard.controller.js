'use strict';

angular.module('seniorprojectYoApp')
    .controller('GroupCardCtrl', function($scope, $location, GroupService, Auth) {

        // Access to to event by using $scope.event
        //console.log($scope.group);

        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/


        /***************************************************************************
         * Get Functions
         **************************************************************************/
        // Get user data
        Auth.isLoggedInAsync(function(success) {
            // Gets the user data from server
            if (Auth.isLoggedIn()) {
                $scope.user = Auth.getCurrentUser();
            }
            populate();
        });

        function populate() {
            populateGroup();
        }

        function populateGroup() {
            GroupService.show($scope.group._id, function(res) {
                $scope.group = res.data.group;

                // Populate organizers
                GroupService.organizers.index($scope.group._id, {}, function(res) {
                    $scope.group.organizers = res.data;
                });

                // Populate events
                GroupService.events.index($scope.group._id, {}, function(res) {
                    //console.log(res.data);
                    $scope.group.events = res.data;
                });
            });
        }

        /***********************************************************************
        * Boolean Functions
        **********************************************************************/
        $scope.isOrganizer = function() {
           if ($scope.user != null){
               for (var i = 0; i < $scope.group.organizers.length; i++) {
                   if ($scope.group.organizers[i]._id === $scope.user._id)
                       return true;
               }
           }
           return false;
        }

    });
