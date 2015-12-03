'use strict';

angular.module('seniorprojectYoApp')
    .controller('EventCardCtrl', function($scope, $location, EventService, GroupService, Auth) {

        // Access to to event by using $scope.event
        //console.log($scope.event);

        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/

        $scope.isLoaded = false;
        $scope.isBusy = false;

        $scope.alerts = [];

        /***************************************************************************
         * Get Functions
         **************************************************************************/
        // Get user
        Auth.isLoggedInAsync(function(success) {
            if (Auth.isLoggedIn()) {
                $scope.user = Auth.getCurrentUser();
            }
            populate();
        });

        function populate() {
            populateEvent();
            $scope.isLoaded = true;
        }

        // Populate event
        function populateEvent() {
            GroupService.show($scope.event.group, function(res) {
                $scope.event.group = res.data.group;

                // Populate organizers
                EventService.organizers.index($scope.event._id, {}, function (res) {
                    $scope.event.organizers = res.data;
                });

                // Populate volunteers
                EventService.volunteers.index($scope.event._id, {}, function(res) {
                    $scope.event.volunteers = res.data;
                });
            });
        }

        // Populate volunteers
        function populateVolunteers() {
            EventService.volunteers.index($scope.event._id, {}, function(res) {
                $scope.event.volunteers = res.data;
            });
        }
        /***************************************************************************
         * Volunteer Button
         **************************************************************************/
         $scope.volunteer = function() {
             if (Auth.isLoggedIn()) {

                 $scope.isBusy = true;

                 // Get most up to date event's volunteers & maxVolunteers
                 EventService.show($scope.event._id, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the event';
                     } else {
                         $scope.event.volunteers = res.data.event.volunteers;
                         $scope.event.maxVolunteers = res.data.event.maxVolunteers;

                         // Can only volunteer if there is enough room
                         if ($scope.event.volunteers.length >= $scope.event.maxVolunteers){
                         $scope.alerts = [];
                             $scope.alerts.push({
                                 type: "warning",
                                 msg: 'Event is full.'
                             });
                             $scope.isBusy = false;
                         }
                         else {

                             // Attempt to volunteer
                             EventService.volunteers.create($scope.event._id, $scope.user._id, function(res) {
                                 // Success
                                 $scope.event.volunteers = res.data;
                                 populateVolunteers();
                                 $scope.alerts = [];
                                 $scope.alerts.push({
                                     type: "success",
                                     msg: 'You have successfully volunteered'
                                 });

                                 $scope.isBusy = false;
                             }, function(res) { // error

                                 $scope.alerts = [];
                                 $scope.alerts.push({
                                     type: "danger",
                                     msg: 'There was a problem volunteering'
                                 });

                                 $scope.isBusy = false;
                             });
                         }
                     }
                 });
             }
             else {
                 $location.path("/login").replace;
             }
         }

         $scope.optOut = function() {
             if (Auth.isLoggedIn()) {

                 $scope.isBusy = true;

                 // Attempt to opt out
                 EventService.volunteers.destroy($scope.event._id, $scope.user._id, function(res) {
                     // Success
                     $scope.event.volunteers = res.data;
                     populateVolunteers();
                     $scope.alerts = [];
                     $scope.alerts.push({
                         type: "success",
                         msg: 'You have successfully opted out'
                     });

                     $scope.isBusy = false;
                 }, function(res) { // error

                     $scope.alerts = [];
                     $scope.alerts.push({
                         type: "danger",
                         msg: 'There was a problem opting out'
                     });

                     $scope.isBusy = false;
                 });
             }
             else {
                 $location.path("/login").replace;
             }

         }

        /***********************************************************************
         * Boolean Functions
         **********************************************************************/
        $scope.isOrganizer = function() {
            if ($scope.user != null){
                for (var i = 0; i < $scope.event.organizers.length; i++) {
                    if ($scope.event.organizers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.isVolunteering = function() {
            if ($scope.user != null){
                for (var i = 0; i < $scope.event.volunteers.length; i++) {
                    if ($scope.event.volunteers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.isCurrentlyActive = function() {
            var rightNow = new Date();

            var startTime = new Date($scope.event.startTimeDate);
            var endTime = new Date($scope.event.endTimeDate);
            if (((startTime - rightNow) < 1) && ((endTime - startTime) > 1)) {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.isEnded = function() {
            var rightNow = new Date();

            var endTime = new Date($scope.event.endTimeDate);
            if ((endTime - rightNow) < 1) {
                return true;
            }
            else {
                return false;
            }
        }

        /***************************************************************************
         * MISC Functions
         **************************************************************************/

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

    });
