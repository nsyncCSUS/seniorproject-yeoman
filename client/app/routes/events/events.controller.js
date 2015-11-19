'use strict';

angular.module('seniorprojectYoApp')
    .controller('EventsCtrl', function($stateParams, $scope, EventService, moment) {
        $scope.message = 'Hello';

        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isAdmin = true;
        $scope.eventId = $stateParams.eventId;
        $scope.isEditing = false;
        $scope.isUpdating = false;
        $scope.currentDate = new Date();
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
        // Gets the group data from server
        if ($stateParams.id) {
            console.log('Getting event');
            EventService.show($stateParams.id, function(res) {
                $scope.event = res.data.event;
                console.log('Back from getting event');
                buildDuration();
                buildInterests();
            });
        } else {
            $scope.event = {};

            buildInterests();
            buildDuration();
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
            $scope.duration = {};
            if (moment.duration(duration).get('days') > 0)
                $scope.duration.days = moment.duration(duration).get('days');
            if (moment.duration(duration).get('hours') > 0)
                $scope.duration.hours = moment.duration(duration).get('hours');
            if (moment.duration(duration).get('minutes') > 0)
                $scope.duration.minutes = moment.duration(duration).get('minutes');

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

            buildDuration();
        }

        $scope.submitEdit = function() {
            $scope.isUpdating = true;
            // Send changes to server
            EventService.update($stateParams.id, {
                event: $scope.event
            }, function(res) {
                $scope.event = res.data.event;
                $scope.alerts.push({
                    type: "success",
                    msg: 'Event updated'
//                    msg: res.data.msg
                });

                $scope.isEditing = false;
                $scope.isUpdating = false;
            }, function(res) {
                $scope.alerts.push({
                    type: "danger",
                    msg: 'There was a problem updating the event'
//                    msg: res.data.msg
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

            buildDuration();
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
            for (var i = 0; i < $scope.event.volunteers.length; i++) {
                if ($scope.event.volunteers[i]._id === $scope.user._id)
                    return true;
            }
            return false;
        }

        $scope.hasDays = function() {
            return $scope.duration.days != null
        }

        $scope.hasHours = function() {
            return $scope.duration.hours != null
        }

        $scope.hasMinutes = function() {
            return $scope.duration.minutes != null
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
