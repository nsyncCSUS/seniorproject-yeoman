'use strict';

angular.module('seniorprojectYoApp')
    .controller('CreateGroupCtrl', [ '$scope', '$location', '$anchorScroll', '$timeout', 'GroupService', function($scope, $location, $anchorScroll, $timeout, GroupService) {

		/***************************************************************************
		 * Variables (includes ones from scope too)
		 **************************************************************************/
		$scope.group =  
		{
				id : "nsync",
				name: "N.Sync()",
				picture : "//placekitten.com/g/500/500/",
				creationDate : "2015-08-26T18:50:10.111Z",
				city : "Sacramento",
				state : "CA",
				zipcode : 95828,
				description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
				googlePlusURL : "www.google.com",
				facebookURL : "https://facebook.com",
				linkedInURL : "https://linkedin.com",
				twitterURL : "https://twitter.com",
				interests : ["Animals", "Environment", "People", "Recreation", "Technology", "Youth"]
		};

		$scope.alerts = [];
		$scope.group.interests = [];
		
		$scope.organizersToAdd = [];
		$scope.searchResults = [];
		
		$scope.isPreviewing = false;
		$scope.isSearching = false;
		$scope.isCreating = false;

		$scope.animalsSelected = "";
		$scope.educationSelected = "";
		$scope.environmentSelected = "";
		$scope.peopleSelected = "";
		$scope.recreationSelected = "";
		$scope.technologySelected = "";
		$scope.youthSelected = "";

		/***************************************************************************
		 * Initialize $scope.group
		 **************************************************************************/
		// Add in the user as an organizer
		var user = {
			id :			"anthonynguyen",
			firstName : 	"Anthony",
			lastName : 		"Nguyen",
			description : 	"Hi, I am a member of N.Sync().",
			picture : 		"//placekitten.com/g/1000/1000/",
			email : 		"anthonyn916@gmail.com",
			birthday : 		"1991-07-24",
			age : 			24,
			city : 			"Elk Grove",
			state : 		"CA",
			zipcode : 		95624,
			phoneNum : 		19162047928,
			googlePlus : 	"google.com",
			facebook : 		"facebook.com",
			linkedIn : 		"linkedin.com",
			twitter : 		"twitter.com",
			volunteeredTo : [],
			creatorOf : 	[],
			organizerOf : 	[],
			subscribedTo : 	[],
			interests : 	[{type: "Technology"}]
		};


        $scope.group.organizers = [];
		$scope.group.organizers.push(user);
		

		$scope.selectedTab = "Upcoming Events";
		$scope.otherTabs = ["Past Events"];

		/***************************************************************************
		 * Building Functions
		 **************************************************************************/
		

		/***********************************************************************
		 * Functions that controls tabs for searching
		 **********************************************************************/
		$scope.setCurrentTab = function(newTab) {
			$scope.selectedTab = newTab;
			
			switch(newTab){
			case "Upcoming Events":
				$scope.otherTabs[0] = "Past Events";
				break;
			case "Past Events":
				$scope.otherTabs[0] = "Upcoming Events";
				break;
			}
		}
		
		$scope.getCurrentTab = function(tabName) {
			if ($scope.selectedTab === tabName)
				return true;
			else
				return false;
		}
		
		/***************************************************************************
		 * Get Functions
		 **************************************************************************/
		$scope.searchUsers = function() {
			$scope.searchResultsPristine = true;
			$scope.isSearching = true;
			// Get search results from server
			$scope.searchResults = [{
				id :			"huy",
				firstName : 	"Huy",
				lastName : 		"Lee"
			},{
				id :			"kris",
				firstName : 	"Kristopher",
				lastName : 		"Tadlock",
				picture : 		"//placekitten.com/g/1001/1001/"
			},{
				id :			"vadzim",
				firstName : 	"Vadzim",
				lastName : 		"Savenok",
				picture : 		"//placekitten.com/g/1002/1002/"
			},{
				id :			"shane",
				firstName : 	"Shane",
				lastName : 		"Singh",
				picture : 		"//placekitten.com/g/1003/1003/"
			},{
				id :			"john",
				firstName : 	"John",
				lastName : 		"Ellis",
				picture : 		"//placekitten.com/g/1004/1004/"
			}
			];
			
			// If the user is already in Organizers to be added list, give the CSS style to that user
			angular.forEach($scope.organizersToAdd, function(currentOrganizerToAdd) {
				angular.forEach($scope.searchResults, function(currentSearchResult) {
					if (currentSearchResult.id === currentOrganizerToAdd.id)
						currentSearchResult.added = "added";
				});
			});

		}
		
		$scope.scrollToResults = function() {
			$timeout(function() {
				$anchorScroll('searchResults');
			}, 1);
		}
		
		/***************************************************************************
		 * Posting Functions
		 **************************************************************************/
		$scope.createGroup = function() {
			$scope.group.creationDate = new Date();
			$scope.isCreating = true;
			// Send new group to server
			GroupService.post({group: $scope.group, user: user}, function(res) {
				switch(res.data.flag){
				case true:
					$scope.alerts.push({type: "success", msg: res.data.msg});
					$timeout(function() {
						$location.path("/groups/" + res.data.group._id).replace;
					}, 3000);
					break;
				case false:
					$scope.alerts.push({type: "danger", msg: res.data.msg});
					$timeout(function() {
						$scope.isCreating = false;
					}, 3000);
					break;
				}
				
			});
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
			angular.forEach($scope.group.interests, function(currentInterest, index) {
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
			$scope.group.interests = newInterests;
			console.log($scope.group.interests);
		}

		/***************************************************************************
		 * Adding/Removing Organizers Function
		 **************************************************************************/
		/*
		 * Adds an organizer to $scope.organizersToAdd array
		 */
		$scope.addOrganizer = function(index) {
			var alreadyAdded = false;
			// Checks if the organizers to be added array is empty or not
			if ($scope.organizersToAdd.length > 0){
				// Checks if user has already been added
				angular.forEach($scope.organizersToAdd, function(currentOrganizerToAdd) {
					// If user is already in the array, flag will be true
					if (currentOrganizerToAdd.id === $scope.searchResults[index].id){
						console.log(currentOrganizerToAdd + "already added");
						alreadyAdded = true;
					}
				});
			}
			// If not added yet, add to array + set class to show it has been added
			if (!alreadyAdded){
				$scope.organizersToAdd.push($scope.searchResults[index]);
				$scope.searchResultsPristine = false;
				$scope.searchResults[index].added = "added";
			}
			console.log($scope.organizersToAdd);
		}

		/*
		 * Removes an organizer from $scope.organizersToAdd array
		 */
		$scope.removeOrganizer = function(index) {
			// Variable for array to be rebuilt so that there are no empty elements
			var newOrganizersToAdd = [];
			// Rebuild $scope.organizersToAdd array
			// Goes through $scope.organizersToAdd array to remove "index"
			angular.forEach($scope.organizersToAdd, function(currentOrganizerToAdd) {
				// If the index to be removed is found
				//		- do not add to rebuilt array
				//		- remove class in search results that shows that it has been added if applicable
				if (currentOrganizerToAdd.id === $scope.organizersToAdd[index].id){
					console.log("removed " + currentOrganizerToAdd);
					angular.forEach($scope.searchResults, function(currentSearchResult) {
						if (currentSearchResult.id === currentOrganizerToAdd.id)
							currentSearchResult.added = "";
					});
				}
				// Otherwise, add organizer to be added to rebuilt array
				else {
					console.log(currentOrganizerToAdd);
					newOrganizersToAdd.push(currentOrganizerToAdd);
				}
			});
			// Sets the rebuilt array
			$scope.organizersToAdd = newOrganizersToAdd;
			console.log($scope.organizersToAdd);
		}

		$scope.scrollToAdd = function(id) {
			$timeout(function() {
				$anchorScroll('add-' + id);
			}, 1);
		}

		$scope.scrollToRemove = function(id) {
			$timeout(function() {
				$anchorScroll('remove-' + id);
			}, 1);
		}

		/***************************************************************************
		 * Boolean Functions
		 **************************************************************************/
		/*
		 * Checks if the gorup has a picture, the view will display a default
		 * picture if no picture is found.
		 */
		$scope.hasPicture = function(type1, index1, type2, index2) {
			switch(type1){
			case "group":
				if ($scope.group.picture != null){
					if ($scope.group.picture.length > 0)
						return true;
					else
						return false;
					}
				else{
					return false;
				}
			case "organizer":
				if ($scope.group.organizersBuilt != null){
					if ($scope.group.organizersBuilt[index1].organizers[index2].picture != null){
						if ($scope.group.organizersBuilt[index1].organizers[index2].picture.length > 0)
							return true;
						else
							return false;
						}
					else
						return false;
				}
				else 
					return false;
			case "organizerXS":
				if ($scope.group.organizersBuiltXS != null){
					if ($scope.group.organizersBuiltXS[index1].organizers[index2].picture != null){
						if ($scope.group.organizersBuiltXS[index1].organizers[index2].picture.length > 0)
							return true;
						else
							return false;
						}
					else
						return false;
				}
				else 
					return false;
			case "subscriber":
				if ($scope.group.subscribers != null){
					if ($scope.group.subscribers[index1].picture != null){
						if ($scope.group.subscribers[index1].picture.length > 0)
							return true;
						else
							return false;
						}
					else
						return false;
				}
				else 
					return false;
			case "event":
				if ($scope.group.events != null){
					if (type2 != null) {
						switch(type2){
						case "volunteer":
							if ($scope.group.events[index1].volunteers[index2].picture != null) {
								if ($scope.group.events[index1].volunteers[index2].picture.length > 0) 
									return true;
								else
									return false;
							}
						}
					}
					else{
						if ($scope.group.events[index1].picture != null){
							if ($scope.group.events[index1].picture.length > 0)
								return true;
							else
								return false;
							}
						else
							return false;
					}
				}
				else 
					return false;
			case "searchedUser":
				if ($scope.searchResults != null && $scope.searchResults.length > 0){
					if ($scope.searchResults[index1].picture != null){
						if ($scope.searchResults[index1].picture.length > 0)
							return true;
						else
							return false;
					}
					else
						return false;
				}
				else 
					return false;
			case "organizerToAdd":
				if ($scope.organizersToAdd != null){
					if ($scope.organizersToAdd[index1].picture != null){
						if ($scope.organizersToAdd[index1].picture.length > 0)
							return true;
						else
							return false;
					}
					else
						return false;
				}
				else 
					return false;
			}
		}

		/*
		 * Used to check if a social media object exists
		 */
		$scope.checkIfHas = function(type) {
			switch(type){
			case "googlePlus":
				if ($scope.group.googlePlusURL != null && $scope.group.googlePlusURL.length > 0)
					return true;
				break;
			case "facebook":
				if ($scope.group.facebookURL != null && $scope.group.facebookURL.length > 0)
					return true;
				break;
			case "twitter":
				if ($scope.group.twitterURL != null && $scope.group.twitterURL.length > 0)
					return true;
				break;
			case "linkedIn":
				if ($scope.group.linkedInURL != null && $scope.group.linkedInURL.length > 0)
					return true;
				break;
			case "website":
				if ($scope.group.personalWebsiteURL != null && $scope.group.personalWebsiteURL.length > 0)
					return true;
				break;
			}
			
			return false;
		}
		
		/*
		 * Checks if there are more than n organizers
		 */
		$scope.hasOrganizers = function(amount) {
			var total = 0;
			if ($scope.group.organizers != null){
				total += $scope.group.organizers.length;
			}
			if ($scope.organizersToAdd != null){
				total += $scope.organizersToAdd.length;
			}
			if (total > amount)
				return true;
			else
				return false;
		}
		
		$scope.getIsSearching = function() {
			return $scope.isSearching;
		}
		
		$scope.hasResults = function() {
			if ($scope.searchResults.length > 0)
				return true;
			else
				return false;
		}
		
		$scope.hasOrganizersToAdd = function() {
			if ($scope.organizersToAdd != null && $scope.organizersToAdd.length > 0)
				return true;
			else
				return false;
		}

		/***************************************************************************
		 * Previewing Functions
		 **************************************************************************/
		$scope.enablePreview = function() {
			$scope.isPreviewing = true;
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
		$scope.cancelCreateGroup = function() {
			$location.path("/home").replace;
		}

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		}
	} ]);