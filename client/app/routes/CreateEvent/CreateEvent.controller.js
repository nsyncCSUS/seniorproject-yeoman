'use strict';

angular.module('seniorprojectYoApp')
    .controller('CreateEventCtrl', function($stateParams, $scope, EventService) {
        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isPreviewing = false;

        $scope.currentDate = new Date();

        $scope.alerts = [];

        $scope.animalsSelected = "";
        $scope.educationSelected = "";
        $scope.environmentSelected = "";
        $scope.peopleSelected = "";
        $scope.recreationSelected = "";
        $scope.technologySelected = "";
        $scope.youthSelected = "";


        $scope.isPreviewing = false;
        $scope.isSearching = false;


        /***************************************************************************
         * Initialize form data
         **************************************************************************/
        $scope.event = {

        };
        $scope.event.startTimeDate = new Date();
        $scope.event.endTimeDate = new Date();
        $scope.maxVolunteers = 0;

        $scope.event = {
            _id: "event1",
            creationUser: "",
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
            maxVolunteers: 5,
            interests: ["Animals", "Education", "Environment", "People", "Recreation", "Technology", "Youth"]
        };

        buildInterests();
        buildDuration();
        
        /***************************************************************************
         * Posting Functions
         **************************************************************************/
        //Create Event relevant functions
        $scope.createEvent = function() {
            // Send new event to server
            CreateEventService.createEvent({
                eventData: $scope.event
            }, function(res) {
                $scope.savedSuccessMsg = res.data.msg;
            });
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
