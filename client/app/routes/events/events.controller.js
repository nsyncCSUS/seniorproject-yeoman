'use strict';

angular.module('seniorprojectYoApp')
    .controller('EventsCtrl', function($stateParams, $scope, $timeout, $location, EventService, GroupService, UserService, Auth) {
        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isAdmin = false;
        $scope.eventId = $stateParams.eventId;
        $scope.isEditing = false;
        $scope.isUpdating = false;
        $scope.isRemoving = false;
        $scope.currentDate = new Date();
        $scope.submitted = false;
        $scope.alerts = [];
        $scope.isBusy = false;

        $scope.animalsSelected = "";
        $scope.educationSelected = "";
        $scope.environmentSelected = "";
        $scope.peopleSelected = "";
        $scope.recreationSelected = "";
        $scope.technologySelected = "";
        $scope.youthSelected = "";

        /***************************************************************************
         * Get Functions
         **************************************************************************/

        // Get event data
        Auth.isLoggedInAsync(function(success) {
            if (Auth.isLoggedIn()) {
                $scope.user = Auth.getCurrentUser();
            }
           // Gets the event data from server
           if ($stateParams.eventId) {
               EventService.show($stateParams.eventId, function(res) {
                   if (res.status === 404) {
                       $scope.alerts.push({type: "danger", msg: "There was a problem retrieving user."});
                   } else {
                       $scope.event = res.data.event;
                       populate();
                       checkAdmin();
                   }
               });
           } else {
               //console.log("no event found");
           }

        });

        function populate() {
            populateGroup();
            populateOrganizers();
            populateVolunteers();
        }

        function populateGroup() {
            // Populate group
            GroupService.show($scope.event.group, function(res) {
                if (res.status === 404) {
                    $scope.errorMessage = 'There was a problem retrieving the group';
                } else {
                    $scope.event.group = res.data.group;
                }
            });
        }

        function populateOrganizers(){
            // Populate organizers
            EventService.organizers.index($scope.event._id, {}, function(res) {
                $scope.event.organizers = res.data;
                //console.log($scope.event);
            });
        }

        function populateVolunteers() {
            // Populate volunteers
            EventService.volunteers.index($scope.event._id, {}, function(res) {
                $scope.event.volunteers = res.data;
            });

        }

        function checkAdmin() {
            if (Auth.isLoggedIn()) {
                // Populate required user data first
                UserService.events.organizerOf.index($scope.user._id, {}, function(res) {
                    $scope.user.events.organizerOf = res.data;

                    for (var i = 0; i < $scope.user.events.organizerOf.length; i++){
                        if ($scope.user.events.organizerOf[i]._id == $stateParams.eventId){
                            $scope.isAdmin = true;
                            break;
                        }
                    }
                });
            }
            else {
                $scope.isAdmin = false;
            }
        }
        /***************************************************************************
         * Building Functions
         **************************************************************************/
        function buildInterests() {
            angular.forEach($scope.event.interests, function(interest) {
                switch (interest) {
                    case "Animals":
                        $scope.animalsSelected = "selected";
                        break;
                    case "Education":
                        $scope.educationSelected = "selected";
                        break;
                    case "Environment":
                        $scope.environmentSelected = "selected";
                        break;
                    case "People":
                        $scope.peopleSelected = "selected";
                        break;
                    case "Recreation":
                        $scope.recreationSelected = "selected";
                        break;
                    case "Technology":
                        $scope.technologySelected = "selected";
                        break;
                    case "Youth":
                        $scope.youthSelected = "selected";
                        break;
                }
            });
        };

        function clearInterests() {
            $scope.animalsSelected = "";
            $scope.educationSelected = "";
            $scope.environmentSelected = "";
            $scope.peopleSelected = "";
            $scope.recreationSelected = "";
            $scope.technologySelected = "";
            $scope.youthSelected = "";
        }

        function buildDuration() {
            var duration = moment($scope.event.endTimeDate).diff(moment($scope.event.startTimeDate));
            var years = moment.duration(duration).get('years');
            var months = moment.duration(duration).get('years');
            var days = moment.duration(duration).get('days');
            var hours = moment.duration(duration).get('hours');
            var minutes = moment.duration(duration).get('minutes');

            $scope.event.duration = "";
            if (years > 0) {
                $scope.event.duration += " " + years + " year";
                if (years > 1)
                    $scope.event.duration += "s";
            }
            if (months > 0) {
                $scope.event.duration += " " + months + " month";
                if (months > 1)
                    $scope.event.duration += "s";
            }
            if (days > 0) {
                $scope.event.duration += " " + days + " day";
                if (days > 1)
                    $scope.event.duration += "s";
            }
            if (hours > 0) {
                $scope.event.duration += " " + hours + " hour";
                if (hours > 1)
                    $scope.event.duration += "s";
            }
            if (minutes > 0) {
                $scope.event.duration += " " + minutes + " minute";
                if (minutes > 1)
                    $scope.event.duration += "s";
            }
        }

        /***************************************************************************
         * Adding/Removing Interests Function
         **************************************************************************/
        $scope.addInterest = function(interest) {
            var hasInterest = false;
            // Variable for array to be rebuilt so that there are no empty elements
            var newInterests = [];
            // Rebuild interests array
            // Checks if the interest selected is in the interest's array
            angular.forEach($scope.event.interests, function(currentInterest, index) {
                //console.log(currentInterest);
                // If in array, remove class to show that it is now unselected
                if (currentInterest === interest) {
                    //console.log("removed " + interest);
                    hasInterest = true;
                    switch (interest) {
                        case "Animals":
                            $scope.animalsSelected = "";
                            break;
                        case "Education":
                            $scope.educationSelected = "";
                            break;
                        case "Environment":
                            $scope.environmentSelected = "";
                            break;
                        case "People":
                            $scope.peopleSelected = "";
                            break;
                        case "Recreation":
                            $scope.recreationSelected = "";
                            break;
                        case "Technology":
                            $scope.technologySelected = "";
                            break;
                        case "Youth":
                            $scope.youthSelected = "";
                            break;
                    }
                }
                // Otherwise, add to rebuilt array
                else {
                    //console.log(currentInterest);
                    newInterests.push(currentInterest);
                }
            });
            // Add interest if it was not in array
            if (hasInterest === false) {
                //console.log("added " + interest);
                newInterests.push(interest);
                switch (interest) {
                    case "Animals":
                        $scope.animalsSelected = "selected";
                        break;
                    case "Education":
                        $scope.educationSelected = "selected";
                        break;
                    case "Environment":
                        $scope.environmentSelected = "selected";
                        break;
                    case "People":
                        $scope.peopleSelected = "selected";
                        break;
                    case "Recreation":
                        $scope.recreationSelected = "selected";
                        break;
                    case "Technology":
                        $scope.technologySelected = "selected";
                        break;
                    case "Youth":
                        $scope.youthSelected = "selected";
                        break;
                }
            }
            // Set the new interest array
            $scope.event.interests = newInterests;
            //console.log($scope.event.interests);
        }

        /***********************************************************************
         * Editing Functions
         **********************************************************************/

        $scope.enableEdit = function() {
            $scope.isEditing = true;
            buildInterests();

            checkStartTime();
            checkEndTime();

            // Backup contents on page
            $scope.event_bak = {};
            angular.copy($scope.event, $scope.event_bak);
        }

        $scope.cancelEdit = function() {
            $scope.isEditing = false;

            // Restore contents on page
            angular.copy($scope.event_bak, $scope.event);
            $scope.event_bak = {};

            // Reset interests for editing
            clearInterests();
            buildInterests();

            checkStartTime();
            checkEndTime();

            buildDuration();
        }

        $scope.confirmRemove = function() {
            $scope.isRemoving = true;
        }

        $scope.cancelRemove = function() {
            $scope.isRemoving = false;
        }

        $scope.submitEdit = function() {

            if ($scope.eventForm.$valid) {
                $scope.isUpdating = true;

                buildDuration();

                // Send changes to server
                EventService.update($scope.event._id, {
                    event: $scope.event
                }, function(res) {  // success
                    $scope.event = res.data.event;
                    $scope.alerts.push({
                        type: "success",
                        msg: 'Event has been updated'
                    });

                    $scope.isEditing = false;
                    $scope.isUpdating = false;
                    populate();
                }, function(res) {  // error
                    $scope.alerts.push({
                        type: "danger",
                        msg: 'There was a problem updating the event'
                    });

                    $scope.isUpdating = false;
                });

                // Keep changes made
                $scope.event_bak = {};
                $scope.animalsSelected_bak = "";
                $scope.educationSelected_bak = "";
                $scope.environmentSelected_bak = "";
                $scope.peopleSelected_bak = "";
                $scope.recreationSelected_bak = "";
                $scope.technologySelected_bak = "";
                $scope.youthSelected_bak = "";

            }
            else {
                $scope.alerts.push({type: "danger", msg: "Errors found, please fix them."});
                //console.log($scope.eventForm.$error);
                $scope.submitted = true;
            }
        }

        $scope.removeEvent = function() {
            if ($scope.isOrganizer()) {
                $scope.isUpdating = true;

                EventService.destroy($scope.event._id,
                function(res) {     // success
                    $scope.alerts.push({
                        type: "success",
                        msg: 'Event has been removed'
                    });

                    $timeout(function() {
                        $location.path("/groups/" + $stateParams.groupId).replace;
                    }, 3000);
                }, function(res) {  // error
                    $scope.alerts.push({
                        type: "danger",
                        msg: 'Error. Event was not removed'
                    });
                });
            }
            else {
                $scope.alerts.push({type: "danger", msg: "You are not an organizer."});
                //console.log($scope.eventForm.$error);
                $scope.isRemoving = false;
                $scope.cancelEdit();
            }
        }

        function checkStartTime() {
            var today = new Date();
            var startTime = new Date($scope.eventForm.startTimeDate.$modelValue);
            if ((startTime - today) < 1) {
                $scope.eventForm.startTimeDate.$setValidity('startTimeDate', false);
            }
            else {
                $scope.eventForm.startTimeDate.$setValidity('startTimeDate', true);
            }
        }

        function checkEndTime() {
            var startTime = new Date($scope.eventForm.startTimeDate.$modelValue);
            var endTime = new Date($scope.eventForm.endTimeDate.$modelValue);

            if ((endTime - startTime) < 1) {
                $scope.eventForm.endTimeDate.$setValidity('endTimeDate', false);
            }
            else {
                $scope.eventForm.endTimeDate.$setValidity('endTimeDate', true);
            }
        }

        /***************************************************************************
         * Volunteer Button
         **************************************************************************/
         $scope.volunteer = function() {
             if (Auth.isLoggedIn()) {

                 $scope.isBusy = true;
                 EventService.show($scope.event._id, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the event';
                     } else {
                         $scope.event.volunteers = res.data.event.volunteers;
                         $scope.event.maxVolunteers = res.data.event.maxVolunteers;
                         if ($scope.event.volunteers.length >= $scope.event.maxVolunteers){
                             $scope.alerts = [];
                             $scope.alerts.push({
                                 type: "warning",
                                 msg: 'Event is full.'
                             });
                             $scope.isBusy = false;
                         }
                         else {
                             EventService.volunteers.create($scope.event._id, $scope.user._id, function(res) {
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
                 EventService.volunteers.destroy($scope.event._id, $scope.user._id, function(res) {
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


        /***************************************************************************
         * Boolean functions
         **************************************************************************/
        $scope.isVolunteering = function() {
            if ($scope.user != null){
                if ($scope.event != null){
                    for (var i = 0; i < $scope.event.volunteers.length; i++) {
                        if ($scope.event.volunteers[i]._id === $scope.user._id)
                        return true;
                    }
                }
            }
            return false;
        }

        $scope.isOrganizer = function() {
            if ($scope.user != null){
                if ($scope.event != null){
                    for (var i = 0; i < $scope.event.organizers.length; i++) {
                        if ($scope.event.organizers[i]._id === $scope.user._id)
                        return true;
                    }
                }
            }
            return false;
        }

        $scope.isCurrentlyActive = function() {
            var rightNow = new Date();

            if ($scope.event != null) {
                var startTime = new Date($scope.event.startTimeDate);
                var endTime = new Date($scope.event.endTimeDate);
                if (((startTime - rightNow) < 1) && ((endTime - rightNow) > 1)) {
                    return true;
                }
                else {
                    return false;
                }
            }

        }

        $scope.isEnded = function() {
            var rightNow = new Date();

            if ($scope.event != null) {
                var endTime = new Date($scope.event.endTimeDate);
                if ((endTime - rightNow) < 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }


        /***************************************************************************
         * MISC Functions
         **************************************************************************/
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

        /***************************************************************************
         * Admin Testing
         **************************************************************************/
        $scope.toggleAdmin = function() {
            //$scope.isAdmin = !$scope.isAdmin;
        }

    });
