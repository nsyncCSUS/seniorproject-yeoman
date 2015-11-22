'use strict';

angular.module('seniorprojectYoApp')
    .controller('CreateEventCtrl', function($stateParams, $scope, $location, $timeout, EventService, UserService, GroupService, Auth) {
        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isPreviewing = false;
        $scope.isCreating = false;
        $scope.isSearching = false;
        $scope.submitted = false;

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
         * Initialize form data
         **************************************************************************/
        $scope.event = {
            name: "SUPER DUPER AWESOME EVENT!!!!",
            description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
            picture: "//placekitten.com/g/501/500/",
            street: "1234 cool st",
            city: "Sacramento",
            state: "CA",
            zipcode: "95828",
            maxVolunteers: 5,
            interests: ["Animals", "Education", "Environment", "People", "Recreation", "Technology", "Youth"],
            organizers: []
        };
        $scope.event.startTimeDate = new Date();
        $scope.event.endTimeDate = new Date();


        // Gets the group data from server
        if ($stateParams.groupId) {
            GroupService.show($stateParams.groupId, function(res) {
                if (res.status === 404) {
                    $scope.errorMessage = 'There was a problem retrieving the group';
                } else {
                    $scope.event.group = res.data.group;
                }
            });
        } else {
            console.log("no group found");
        }

		$scope.event.organizers.push(Auth.getCurrentUser());
		$scope.event.creationUser = Auth.getCurrentUser();

        buildInterests();
        buildDuration();

        /***************************************************************************
         * Posting Functions
         **************************************************************************/
        //Create Event relevant functions
        $scope.createEvent = function() {
            checkStartTime();
            checkEndTime();
			$scope.event.creationDate = new Date();

            if ($scope.eventForm.$valid) {
                $scope.isCreating = true;

                buildDuration();
                EventService.create({event: $scope.event},
                    function(res) {     // success

                        $scope.alerts.push({type: "success", msg: "Successfully created event, redirecting in 3 seconds..."});

                        // Add newly created event to group
                        var group = {};
                        var event = res.data.event;
                        if ($stateParams.groupId) {
                            GroupService.show($stateParams.groupId, function(res) {
                                if (res.status === 404) {
                                    $scope.errorMessage = 'There was a problem retrieving the group';
                                } else {
                                    group = res.data.group;
                                    group.events.push(event);

                                    GroupService.update( $stateParams.groupId, { group: group },
                                        function(res) { // success
                                        },
                                        function(res) { // error

                                        });
                                }
                            });
                        } else {
                            console.log("no group found");
                        }


                        // Add newly created event to user
                        var user = Auth.getCurrentUser();
                        user.events.organizerOf.push(res.data.event);
                        user.events.creatorOf.push(res.data.event);

                        //console.log(user);

                        UserService.update( user._id, { user: user },
                            function(res) { // success
                            //console.log(res.data.user);
                            },
                            function(res) { // error

                            });

                        $timeout(function() {
                            $location.path("/groups/" + group._id + "/events/" + res.data.event._id).replace;
                        }, 3000);
                    },
                    function(res) {     // error
                        $scope.alerts.push({type: "danger", msg: "Unsuccessfully created event"});
                        $timeout(function() {
                            $scope.isCreating = false;
                        }, 3000);

                    });
                }
                else {
                    $scope.alerts.push({type: "danger", msg: "Errors found, please fix them."});
                    $scope.submitted = true;
                    //console.log("invalid");
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


        /***************************************************************************
         * Boolean functions
         **************************************************************************/

        /***************************************************************************
         * Previewing Functions
         **************************************************************************/
        $scope.enablePreview = function() {
            $scope.isPreviewing = true;
            buildDuration();
        }

        $scope.cancelPreview = function() {
            $scope.isPreviewing = false;
        }

        $scope.getIsPreviewing = function() {
            if ($scope.isPreviewing === true)
                return true;
            else
                return false;
        }

        /***************************************************************************
         * MISC Functions
         **************************************************************************/
        $scope.cancelCreateEvent = function() {
            $location.path("/home").replace;
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

    });
