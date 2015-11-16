'use strict';

angular.module('seniorprojectYoApp')
    .controller('CreateEventCtrl', function($scope) {
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

        $scope.event = {

        };
        $scope.event.startTimeDate = new Date('2015-03-01T00:00:00Z');
        $scope.event.endTimeDate = new Date('2015-03-01T00:00:00Z');

        $scope.isPreviewing = false;
        $scope.isSearching = false;


		/***************************************************************************
		 * Get Functions
		 **************************************************************************/
         $scope.event = {
             _id : "event1",
             creationUser: "",
             group: {
                 _id : "nsync",
                 name: "N.Sync().......... .............. ................ ............. ..........................",
                 picture : "//placekitten.com/g/500/500/",
                 creationDate : "2015-08-26T18:50:10.111Z"
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
             interests : ["Animals", "Education", "Environment", "People", "Recreation", "Technology", "Youth"]

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
                switch(interest){
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
		$scope.addInterest = function (interest) {
			var hasInterest = false;
			// Variable for array to be rebuilt so that there are no empty elements
			var newInterests = [];
			// Rebuild interests array
			// Checks if the interest selected is in the interest's array
			angular.forEach($scope.event.interests, function(currentInterest, index) {
				console.log(currentInterest);
				// If in array, remove class to show that it is now unselected
				if (currentInterest === interest){
					console.log("removed " + interest);
					hasInterest = true;
					switch(interest) {
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
			if (hasInterest === false){
				console.log("added " + interest);
				newInterests.push(interest);
				switch(interest) {
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
        $scope.hasDays = function(){
            if ($scope.duration.days != null) {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.hasHours = function(){
           if ($scope.duration.hours != null) {
               return true;
           }
           else {
               return false;
           }
        }

        $scope.hasMinutes = function(){
          if ($scope.duration.minutes != null) {
              return true;
          }
          else {
              return false;
          }
        }

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
