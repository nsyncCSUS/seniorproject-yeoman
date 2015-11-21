'use strict';

angular.module('seniorprojectYoApp')
    .controller('DashboardCtrl', function($scope, $stateParams, $anchorScroll, $timeout, UserService, GroupService, EventService, Auth) {
        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/


        $scope.selectedTab = "Upcoming Events";
        $scope.otherTabs = ["Past Events", "Recommended Events"];


        /***************************************************************************
         * Get Functions
         **************************************************************************/
         // Get user data
         Auth.isLoggedInAsync(function(success) {
             if (Auth.isLoggedIn()) {
                 console.log(Auth.getCurrentUser());
                 $scope.user = Auth.getCurrentUser();

                 populateUser();
             }
         });

         function populateUser() {
             // Populate organizerOf
             UserService.groups.organizerOf.index($scope.user._id, function(res) {
                 $scope.user.groups.organizerOf = res.data;
             });

             // Populate subscribedTo
             UserService.groups.subscribedTo.index($scope.user._id, function(res) {
                 $scope.user.groups.subscribedTo = res.data;
             });

             // Populate volunteeredTo
             UserService.events.volunteeredTo.index($scope.user._id, function(res) {
                 $scope.user.events.volunteeredTo = res.data;
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

        /***************************************************************************
         * Volunteer Button
         **************************************************************************/
        $scope.volunteer = function(curEvent) {

        }

        $scope.optOut = function(curEvent) {

        }

        /***********************************************************************
         * Boolean Functions
         **********************************************************************/
        /*
         * Checks if there are more than 1 upcoming events, the view will display
         * arrows to move across events if that is the case.
         */
        $scope.hasMultipleEvents = function() {
            if ($scope.upcomingEvents != null) {
                if ($scope.upcomingEvents.length >= 2)
                    return true;
                else
                    return false;
            } else
                return false;
        }

        $scope.isVolunteering = function(curEvent) {
            for (var i = 0; i < $scope.user.volunteeredTo[curEvent].volunteers.length; i++) {
                if ($scope.user.volunteeredTo[curEvent].volunteers[i]._id === $scope.user._id)
                    return true;
            }
            return false;
        }


    });
