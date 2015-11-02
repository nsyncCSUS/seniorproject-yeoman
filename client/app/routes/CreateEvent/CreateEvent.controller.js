'use strict';

angular.module('seniorprojectYoApp')
    .controller('CreateEventCtrl', function($scope) {
        $scope.message = 'Hello';


        //    	console.log("Moment: " + moment);
        //    	console.log("Moment toString: " + moment.toString());
        //    	console.log("Moment JSON: " + JSON.parse(moment));

        //moment.changeLocale("de");
        //    	for(var i in Object.keys(moment)) {
        //    		console.log(i + ", " + moment[i]);
        //    	}

        $scope.event = {

        };
        $scope.event.startTimeDate = new Date('2015-03-01T00:00:00Z');
        $scope.event.endTimeDate = new Date('2015-03-01T00:00:00Z');

        console.log($scope.event);
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.tDifference;

        $scope.isPreviewing = false;
        $scope.isSearching = false;


        $scope.event.interests = [];
        $scope.animalsSelected = "";
        $scope.educationSelected = "";
        $scope.environmentSelected = "";
        $scope.peopleSelected = "";
        $scope.recreationSelected = "";
        $scope.technologySelected = "";
        $scope.youthSelected = "";


        //Create Event relevant functions
        $scope.createEvent = function() {
            // Send new event to server
            CreateEventService.createEvent({
                eventData: $scope.event
            }, function(res) {
                $scope.savedSuccessMsg = res.data.msg;
            });
        }

        $scope.addInterest = function(interest) {
            var hasInterest = false;
            // Variable for array to be rebuilt so that there are no empty elements
            var newInterests = [];
            // Rebuild interests array
            // Checks if the interest selected is in the interest's array
            angular.forEach($scope.event.interests, function(currentInterest, index) {
                console.log(currentInterest.type);
                // If in array, remove class to show that it is now unselected
                if (currentInterest.type === interest) {
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
                newInterests.push({
                    type: interest
                });
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

        $scope.enablePreview = function() {
            $scope.isPreviewing = true;
            // Build an array for displaying organizers in a carousel
            //buildOrganizers();
            // Build one for mobile view also
            //buildOrganizersXS();
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

        $scope.cancelCreateEvent = function() {
            $location.path("/home").replace;
        }


        //DateTime Picker stuff
        var in10Days = new Date();
        in10Days.setDate(in10Days.getDate() + 10);



        $scope.open = {
            startTime: false,
            endTime: false,
        };

        $scope.timediff = function(start, end) {
            $scope.tDifference = moment.utc(moment(end).diff(moment(start))).format("mm");
            //return moment.utc(moment(end).diff(moment(start))).format("mm");
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
        };

        $scope.dateOptions = {
            showWeeks: false,
            startingDay: 1
        };

        $scope.timeOptions = {
            readonlyInput: false,
            showMeridian: false
        };

        $scope.dateModeOptions = {
            minMode: 'year',
            maxMode: 'year'
        };

        $scope.openCalendar = function(e, date) {
            $scope.open[date] = true;
        };

        // watch date4 and date5 to calculate difference
        $scope.calculateWatch = $scope.$watch(function() {
            return $scope.dates;
        }, function() {
            if ($scope.event.startTime && $scope.event.endTime) {
                var diff = $scope.event.startTime.getTime() - $scope.event.endTime.getTime();
                $scope.dayRange = Math.round(Math.abs(diff / (1000 * 60 * 60 * 24)))
            } else {
                $scope.dayRange = 'n/a';
            }
        }, true);

        $scope.$on('$destroy', function() {
            $scope.calculateWatch();
        });
        /*
        $scope.options = {
          hstep: [1, 2, 3],
          mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
          $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
          var d = new Date();
          d.setHours( 14 );
          d.setMinutes( 0 );
          $scope.mytime = d;
        };

      
        $scope.changed = function () {
          $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
          $scope.mytime = null;
        };*/

    });