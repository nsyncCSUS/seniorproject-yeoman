'use strict';

angular.module('seniorprojectYoApp')
    .controller('DashboardCtrl', function($scope, $stateParams, $anchorScroll, $timeout, UserService, GroupService, EventService, Auth) {
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
                     console.log($scope.user);
                         console.log(Auth.getCurrentUser());
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

                             console.log($scope.upcomingEvents);
                         });
                     });
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

                // Get updated event before trying to
                EventService.show($scope.upcomingEvents[curEvent]._id, function(res) {
                    if (res.status === 404) {
                        $scope.errorMessage = 'There was a problem retrieving the event';
                    } else {
                        $scope.upcomingEvents[curEvent] = res.data.event;
                        if ($scope.upcomingEvents[curEvent].volunteers.length >= $scope.upcomingEvents[curEvent].maxVolunteers){
                            $scope.alerts.push({
                                type: "warning",
                                msg: 'Event is full.'
                            });
                        }
                        else {
                            $scope.isBusy = true;

                            $scope.user = Auth.getCurrentUser();

                            $scope.user.events.volunteeredTo.push($scope.upcomingEvents[curEvent]);

                            UserService.update($scope.user._id, { user: $scope.user },
                                function(res) {  // success
                                    //$scope.user = res.data.user;
                                    console.log(res.data.user);
                                    $scope.upcomingEvents[curEvent].volunteers.push(res.data.user);

                                    EventService.update($scope.upcomingEvents[curEvent]._id, { event: $scope.upcomingEvents[curEvent] },
                                        function(res) {  // success
                                            //$scope.group.events[curEvent] = res.data.event;
                                            console.log(res.data.event);

                                            //populateUpcomingEvents();

                                            $scope.alerts.push({
                                                type: "success",
                                                msg: 'You have successfully volunteered'
                                            });

                                            $scope.isBusy = false;

                                        },
                                        function(res) {  //error
                                            $scope.alerts.push({
                                                type: "danger",
                                                msg: 'There was a problem volunteering'
                                            });
                                        });

                                    },
                                    function(res) {  // error
                                        $scope.alerts.push({
                                            type: "danger",
                                            msg: 'There was a problem volunteering'
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        $location.path("/login/").replace;
                    }
                }

        $scope.optOut = function(curEvent) {
            if (Auth.isLoggedIn()) {

                // Get updated event before trying to
                EventService.show($scope.upcomingEvents[curEvent]._id, function(res) {
                    if (res.status === 404) {
                        $scope.errorMessage = 'There was a problem retrieving the event';
                    } else {
                        $scope.upcomingEvents[curEvent] = res.data.event;
                        if ($scope.upcomingEvents[curEvent].volunteers.length >= $scope.upcomingEvents[curEvent].maxVolunteers){
                            $scope.alerts.push({
                                type: "warning",
                                msg: 'Event is full.'
                            });
                        }
                        else {

                            EventService.volunteers.index($scope.upcomingEvents[curEvent]._id, {}, function(res) {
                                $scope.upcomingEvents[curEvent].volunteers = res.data;

                                $scope.isBusy = true;

                                $scope.user = Auth.getCurrentUser();

                                // Remove event from user volunteer list
                                for (var i = 0; i < $scope.user.events.volunteeredTo.length; i++) {
                                    if ($scope.user.events.volunteeredTo[i]._id === $scope.upcomingEvents[curEvent]._id){
                                        $scope.user.events.volunteeredTo.splice(i, 1);
                                    }
                                }

                                // Remove user from event volunteer list
                                for (var i = 0; i < $scope.upcomingEvents[curEvent].volunteers.length; i++) {
                                    if ($scope.upcomingEvents[curEvent].volunteers[i]._id === $scope.user._id){
                                        $scope.upcomingEvents[curEvent].volunteers.splice(i, 1);
                                    }
                                }

                                UserService.update($scope.user._id, { user: $scope.user },
                                    function(res) {  // success
                                        //$scope.user = res.data.user;
                                        console.log(res.data.user);

                                        EventService.update($scope.upcomingEvents[curEvent]._id, { event: $scope.upcomingEvents[curEvent] },
                                            function(res) {  // success
                                                //$scope.group.events[curEvent] = res.data.event;
                                                console.log(res.data.event);

                                                //populateUpcomingEvents();

                                                $scope.alerts.push({
                                                    type: "success",
                                                    msg: 'You have successfully opted out'
                                                });

                                                $scope.isBusy = false;

                                            },
                                            function(res) {  //error
                                                $scope.alerts.push({
                                                    type: "danger",
                                                    msg: 'There was a problem opting out'
                                                });
                                            });

                                        },
                                        function(res) {  // error
                                            $scope.alerts.push({
                                                type: "danger",
                                                msg: 'There was a problem opting out'
                                            });
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        $location.path("/login/").replace;
                    }

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
            if ($scope.user != null){
                for (var i = 0; i < $scope.upcomingEvents[curEvent].volunteers.length; i++) {
                    if ($scope.upcomingEvents[curEvent].volunteers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.isOrganizer = function(curEvent) {
            if ($scope.user != null){
                for (var i = 0; i < $scope.upcomingEvents[curEvent].organizers.length; i++) {
                    if ($scope.upcomingEvents[curEvent].organizers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        /***************************************************************************
        * MISC Functions
        **************************************************************************/
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

    });
