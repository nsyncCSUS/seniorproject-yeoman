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
             // VolunteeredTo
             UserService.events.volunteeredTo.index($scope.user._id, {}, function(res) {
                 $scope.user.events.volunteeredTo = res.data;

                 // Combine all events into 1 array
                 angular.forEach($scope.user.events.volunteeredTo, function(event) {
                     $scope.upcomingEvents.push(event);
                 });

                 // OrganizerOf
                 UserService.events.organizerOf.index($scope.user._id, {}, function(res) {
                     $scope.user.events.organizerOf = res.data;

                     // Combine all events into 1 array
                     angular.forEach($scope.user.events.organizerOf, function(event) {
                         $scope.upcomingEvents.push(event);
                     });

                     populateUpcomingEvents();

                 });
             });

             // Populate recommended events
         };

         function populateUpcomingEvents() {
             // Populate group + organizerOf + volunteers for all events
             angular.forEach($scope.upcomingEvents, function(event) {
                 GroupService.show(event.group, function(res) {
                     event.group = res.data.group;

                     EventService.organizers.index(event._id, {}, function (res) {
                         event.organizers = res.data;

                         EventService.volunteers.index(event._id, {}, function(res) {
                             event.volunteers = res.data;

                             //console.log($scope.upcomingEvents);
                         });
                     });
                 });
             });
         }

         function populateAnEvent(event) {
             EventService.organizers.index(event._id, {}, function (res) {
                 event.organizers = res.data;

                 EventService.volunteers.index(event._id, {}, function(res) {
                     event.volunteers = res.data;

                     //console.log($scope.upcomingEvents);
                 });
             });
         }

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
             if (Auth.isLoggedIn()) {

                 $scope.isBusy = true;
                 var eventIndex = $scope.upcomingEvents.indexOf($filter('filter')($scope.upcomingEvents, {_id: curEvent._id}, true)[0]);
                 EventService.show($scope.upcomingEvents[eventIndex]._id, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the event';
                     } else {
                         $scope.upcomingEvents[eventIndex].volunteers = res.data.event.volunteers;
                         $scope.upcomingEvents[eventIndex].maxVolunteers = res.data.event.maxVolunteers;
                         if ($scope.upcomingEvents[eventIndex].volunteers.length >= $scope.upcomingEvents[eventIndex].maxVolunteers){
                             $scope.alerts.push({
                                 type: "warning",
                                 msg: 'Event is full.'
                             });
                             $scope.isBusy = false;
                         }
                         else {
                             EventService.volunteers.create($scope.upcomingEvents[eventIndex]._id, $scope.user._id, function(res) {
                                 $scope.upcomingEvents[eventIndex].volunteers = res.data;
                                 populateAnEvent($scope.upcomingEvents[eventIndex]);
                                 $scope.alerts.push({
                                     type: "success",
                                     msg: 'You have successfully volunteered'
                                 });

                                 $scope.isBusy = false;
                             }, function(res) { // error

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

         $scope.optOut = function(curEvent) {
             if (Auth.isLoggedIn()) {

                 $scope.isBusy = true;
                 var eventIndex = $scope.upcomingEvents.indexOf($filter('filter')($scope.upcomingEvents, {_id: curEvent._id}, true)[0]);
                 EventService.volunteers.destroy($scope.upcomingEvents[eventIndex]._id, $scope.user._id, function(res) {
                     $scope.upcomingEvents[eventIndex].volunteers = res.data;
                     populateAnEvent($scope.upcomingEvents[eventIndex]);
                     $scope.alerts.push({
                         type: "success",
                         msg: 'You have successfully unvolunteered'
                     });

                     $scope.isBusy = false;
                 }, function(res) { // error

                     $scope.alerts.push({
                         type: "danger",
                         msg: 'There was a problem unvolunteering'
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
        $scope.isVolunteering = function(curEvent) {
            if ($scope.user != null){
                for (var i = 0; i < curEvent.volunteers.length; i++) {
                    if (curEvent.volunteers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.isOrganizer = function(curEvent) {
            if ($scope.user != null){
                for (var i = 0; i < curEvent.organizers.length; i++) {
                    if (curEvent.organizers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.isCurrentlyActive = function(curEvent) {
            var rightNow = new Date();

            if (curEvent != null) {
                var startTime = new Date(curEvent.startTimeDate);
                if ((startTime - rightNow) < 1) {
                    return true;
                }
                else {
                    return false;
                }
            }

            if ($scope.user != null) {
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
