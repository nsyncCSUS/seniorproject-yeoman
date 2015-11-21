'use strict';

angular.module('seniorprojectYoApp')
    .controller('EventsCtrl', function($stateParams, $scope, $timeout, EventService, GroupService, Auth) {
        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isAdmin = false;
        $scope.eventId = $stateParams.eventId;
        $scope.isEditing = false;
        $scope.isUpdating = false;
        $scope.currentDate = new Date();
        $scope.submitted = false;
        $scope.alerts = [];

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
               for (var i = 0; i < Auth.getCurrentUser().events.organizerOf.length; i++){
                   if (Auth.getCurrentUser().events.organizerOf[i] == $stateParams.eventId){
                       $scope.isAdmin = true;
                       break;
                   }
               }
           }
           else {
               $scope.isAdmin = false;
           }
           // Gets the event data from server
           if ($stateParams.eventId) {
               EventService.show($stateParams.eventId, function(res) {
                   if (res.status === 404) {
                       $scope.errorMessage = 'There was a problem retrieving the event';
                   } else {
                       $scope.event = res.data.event;
                       populateEvent();
                   }
               });
           } else {
               console.log("no event found");
           }

        });


        function populateEvent() {
           // Populate group
           GroupService.show($scope.event.group, function(res) {
               if (res.status === 404) {
                   $scope.errorMessage = 'There was a problem retrieving the group';
               } else {
                   $scope.event.group = res.data.group;
               }
           });

           // Populate organizers
           EventService.organizers.index($scope.event._id, function(res) {
               $scope.event.organizes = res.data;
           });

           // Populate volunteers
           EventService.volunteers.index($scope.event._id, function(res) {
               $scope.event.volunteers = res.data;
           });

        };
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
                console.log(currentInterest);
                // If in array, remove class to show that it is now unselected
                if (currentInterest === interest) {
                    console.log("removed " + interest);
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
                    console.log(currentInterest);
                    newInterests.push(currentInterest);
                }
            });
            // Add interest if it was not in array
            if (hasInterest === false) {
                console.log("added " + interest);
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
            console.log($scope.event.interests);
        }

        /***********************************************************************
         * Editing Functions
         **********************************************************************/
        $scope.getIsEditing = function() {
            return $scope.isEditing === true
        }

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
                    populateEvent();
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
                console.log($scope.eventForm.$error);
                $scope.submitted = true;
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

        }

        $scope.optOut = function() {

        }

        /***************************************************************************
         * Subscribe Button
         **************************************************************************/
        $scope.subscribe = function() {

        }


        /***************************************************************************
         * Boolean functions
         **************************************************************************/
        $scope.isVolunteering = function() {
            if ($scope.event != null){
                for (var i = 0; i < $scope.event.volunteers.length; i++) {
                    if ($scope.event.volunteers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.getCurrentlyActive = function() {
            var rightNow = new Date();

            if ($scope.event != null) {
                var startTime = new Date($scope.event.startTimeDate);
                if ((startTime - rightNow) < 1) {
                    return true;
                }
                else {
                    return false;
                }
            }

            return true;
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
            $scope.isAdmin = !$scope.isAdmin;
        }

    });

/*{
                  _id : "event1",
                  creationUser: {
                      _id : "creatorid",
                      firstName : "Anthony",
                      lastName : "Nguyen",
                      picture : "//placekitten.com/g/505/500/"
                  },
                  group: {
                      _id: "nsync",
                      name: "N.Sync().......... .............. ................ ............. ..........................",
                      picture: "//placekitten.com/g/500/500/",
                      creationDate: "2015-08-26T18:50:10.111Z"
                  },
                  name: "SUPER DUPER AWESOME EVENT!!!!",
                  description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
                  picture: "//placekitten.com/g/501/500/",
                  startTimeDate: "2015-08-26T18:50:10.111Z",
                  endTimeDate: "2015-08-27T19:50:10.111Z",
                  street: "1234 cool st",
                  city: "Sacramento",
                  state: "CA",
                  zipcode: "95828",
                  maxVolunteers: 50,
                  volunteers: [{
                      _id: "v1",
                      firstName: "Kitten 1",
                      lastName: "1"
                  }, {
                      _id: "v2",
                      firstName: "Kitten 2",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/251"
                  }, {
                      _id: "v3",
                      firstName: "Kitten 3",
                      lastName: "1"
                  }, {
                      _id: "v4",
                      firstName: "Kitten 4",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/253"
                  }, {
                      _id: "v5",
                      firstName: "Kitten 5",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/254"
                  }, {
                      _id: "v6",
                      firstName: "Kitten 6",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/255"
                  }, {
                      _id: "v7",
                      firstName: "Kitten 7",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/256"
                  }, {
                      _id: "v8",
                      firstName: "Kitten 8",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/257"
                  }, {
                      _id: "v9",
                      firstName: "Kitten 9",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/258"
                  }, {
                      _id: "v10",
                      firstName: "Kitten 10",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/259"
                  }, {
                      _id: "v11",
                      firstName: "Kitten 11",
                      lastName: "1",
                      picture: "//placekitten.com/g/250/260"
                  }],
                  interests: ["Animals", "Education", "Environment", "People", "Recreation", "Technology", "Youth"]

              }*/
