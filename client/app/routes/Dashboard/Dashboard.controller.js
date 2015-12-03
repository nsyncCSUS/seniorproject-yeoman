'use strict';

angular.module('seniorprojectYoApp')
    .controller('DashboardCtrl', function($scope, $stateParams, $anchorScroll, $timeout, $filter, UserService, GroupService, EventService, Auth) {
        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/

         $scope.alerts = [];
         $scope.isBusy = false;

         $scope.selectedTab = "Upcoming Events";
         $scope.otherTabs = ["Past Events", "Recommended Events"];


        /***************************************************************************
         * Get Functions
         **************************************************************************/
         // Get user data
         Auth.isLoggedInAsync(function(success) {
             if (Auth.isLoggedIn()) {
                 $scope.user = Auth.getCurrentUser();

                 populateUser();
                     //console.log($scope.user);
                         //console.log(Auth.getCurrentUser());
             }
         });

         function populateUser() {
             // Populate organizerOf Groups
             UserService.groups.organizerOf.index($scope.user._id, {}, function(res) {
                 $scope.user.groups.organizerOf = res.data;
             });

             // Populate subscribedTo
             UserService.groups.volunteeredTo.index($scope.user._id, {}, function(res) {
                 $scope.user.groups.volunteeredTo = res.data;
             });

             // Populate upcomingEvents = volunteeredTo + organizerOf
             $scope.upcomingEvents = [];
             // VolunteeredTo Events
             UserService.events.volunteeredTo.index($scope.user._id, {}, function(res) {
                 $scope.user.events.volunteeredTo = res.data;

                 // Combine all events into 1 array
                 angular.forEach($scope.user.events.volunteeredTo, function(event) {
                     $scope.upcomingEvents.push(event);
                 });

                 // OrganizerOf Events
                 UserService.events.organizerOf.index($scope.user._id, {}, function(res) {
                     $scope.user.events.organizerOf = res.data;

                     // Combine all events into 1 array
                     angular.forEach($scope.user.events.organizerOf, function(event) {
                         $scope.upcomingEvents.push(event);
                     });
                 });
             });

             // Populate recommended events
         };

        /***********************************************************************
         * Building Functions
         **********************************************************************/

        /***********************************************************************
         * Functions that controls tabs for searching
         **********************************************************************/
        $scope.setCurrentTab = function(newTab) {
            $scope.selectedTab = newTab;

            switch (newTab) {
                case "Upcoming Events":
                    $scope.otherTabs[0] = "Past Events";
                    $scope.otherTabs[1] = "Recommended Events";
                    break;
                case "Past Events":
                    $scope.otherTabs[0] = "Upcoming Events";
                    $scope.otherTabs[1] = "Recommended Events";
                    break;
                case "Recommended Events":
                    $scope.otherTabs[0] = "Upcoming Events";
                    $scope.otherTabs[1] = "Past Events";
                    break;
            }

            $timeout(function() {
                $anchorScroll('tabs');
            }, 1);
        }

        $scope.getCurrentTab = function(tabName) {
            if ($scope.selectedTab === tabName)
                return true;
            else
                return false;
        }

        /***********************************************************************
         * Boolean Functions
         **********************************************************************/

        /***************************************************************************
        * MISC Functions
        **************************************************************************/
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

    });
