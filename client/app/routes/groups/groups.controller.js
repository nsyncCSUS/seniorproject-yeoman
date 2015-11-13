'use strict';

angular.module('seniorprojectYoApp')
    .controller('GroupsCtrl', ['$scope', '$routeParams', '$window', '$anchorScroll', '$timeout', 'GroupService', 'GroupFactory', function($scope, $routeParams, $window, $anchorScroll, $timeout, GroupService, GroupFactory) {

		/***************************************************************************
		 * Variables (includes ones from scope too)
		 **************************************************************************/
		$scope.isAdmin = true;
		
		$scope.groupId = $routeParams.groupId;
		
		$scope.isEditing = false;
		$scope.isSearching = false;
		$scope.isUpdating = false;
		
		

		$scope.organizersToAdd = [];
		$scope.searchResults = [];
		$scope.alerts = [];

		$scope.animalsSelected = "";
		$scope.educationSelected = "";
		$scope.environmentSelected = "";
		$scope.peopleSelected = "";
		$scope.recreationSelected = "";
		$scope.technologySelected = "";
		$scope.youthSelected = "";
		
		$scope.loaded = false;

		$scope.selectedTab = "Upcoming Events";
		$scope.otherTabs = ["Past Events"];

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
		 * Get Functions
		 **************************************************************************/
		// Gets the group data from server
		if($routeParams.groupId != null){
			GroupService.get({id: $routeParams.groupId}, function(res) {
				$scope.group = res.data.group;
				buildInterests();
				
				// Get Organizers by ID
				
			});
		}
		else{
			$scope.group =  
			{
					id : "nsync",
					name: "N.Sync().......... .............. ................ ............. ..........................",
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
					events : [ {
						id : "event1",
						creatorId: "",
						groupId: "",
						name : "Awesome Event Number 1 asdf asdf asdf asdf",
						description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
						picture : "//placekitten.com/g/501/500/",
						startTimeDate : "2015-10-26T18:50:10.111Z",
						endTimeDate : "2015-10-27T18:50:10.111Z",
						street: "1234 cool st", city: "Sacramento", state: "CA", zipcode: "95828",
						maxVolunteers : 50,
						volunteers: [{id: "v1", firstName: "Kitten 1", lastName: "1"}, 
						             {id: "v2", firstName: "Kitten 2", lastName: "1", picture: "//placekitten.com/g/250/251"}, 
						             {id: "v3", firstName: "Kitten 3", lastName: "1"}, 
						             {id: "v4", firstName: "Kitten 4", lastName: "1", picture: "//placekitten.com/g/250/253"}, 
						             {id: "v5", firstName: "Kitten 5", lastName: "1", picture: "//placekitten.com/g/250/254"}, 
						             {id: "v6", firstName: "Kitten 6", lastName: "1", picture: "//placekitten.com/g/250/255"}, 
						             {id: "v7", firstName: "Kitten 7", lastName: "1", picture: "//placekitten.com/g/250/256"}, 
						             {id: "v8", firstName: "Kitten 8", lastName: "1", picture: "//placekitten.com/g/250/257"}, 
						             {id: "v9", firstName: "Kitten 9", lastName: "1", picture: "//placekitten.com/g/250/258"}, 
						             {id: "v10", firstName: "Kitten 10", lastName: "1", picture: "//placekitten.com/g/250/259"}, 
						             {id: "v11", firstName: "Kitten 11", lastName: "1", picture: "//placekitten.com/g/250/260"}],
						interests : ["Animals", "Education", "Environment", "People", "Recreation", "Technology", "Youth"]
										
					},
					{
						id : "event2",
						creatorId: "",
						groupId: "",
						name : "Awesome Event Number 2 asdf asdf asdf asdf",
						description: "aaaaaaaaaa bbbbbbbbbbbbbbb cccccccccccccccc dddddddddddddddddd eeeeeeeeeeeeeeeeeee fffffffffffffffffff gggggggggggggggggg hhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjjjj",
						picture : "//placekitten.com/g/503/500/",
						street: "4321 cool st", city: "Sacramento", state: "CA", zipcode: "95828",
						startTimeDate : "2015-10-28T18:50:10.111Z",
						endTimeDate : "2015-10-29T18:50:10.111Z",
						maxVolunteers : 50,
						volunteers: [{id: "v1", firstName: "Kitten 1", lastName: "1", picture: "//placekitten.com/g/251/250"}, 
						             {id: "v2", firstName: "Kitten 2", lastName: "1", picture: "//placekitten.com/g/251/251"}, 
						             {id: "v3", firstName: "Kitten 3", lastName: "1", picture: "//placekitten.com/g/251/252"}, 
						             {id: "v4", firstName: "Kitten 4", lastName: "1", picture: "//placekitten.com/g/251/253"}, 
						             {id: "v5", firstName: "Kitten 5", lastName: "1"}, 
						             {id: "v6", firstName: "Kitten 6", lastName: "1", picture: "//placekitten.com/g/251/255"}, 
						             {id: "v7", firstName: "Kitten 7", lastName: "1", picture: "//placekitten.com/g/251/256"}, 
						             {id: "v8", firstName: "Kitten 8", lastName: "1", picture: "//placekitten.com/g/251/257"}, 
						             {id: "v9", firstName: "Kitten 9", lastName: "1", picture: "//placekitten.com/g/251/258"}, 
						             {id: "v10", firstName: "Kitten 10", lastName: "1"}, 
						             {id: "v11", firstName: "Kitten 11", lastName: "1", picture: "//placekitten.com/g/251/260"}, 
						             {id: "v12", firstName: "Kitten 12", lastName: "1", picture: "//placekitten.com/g/251/261"}, 
						             {id: "v13", firstName: "Kitten 13", lastName: "1", picture: "//placekitten.com/g/251/262"}, 
						             {id: "v14", firstName: "Kitten 14", lastName: "1", picture: "//placekitten.com/g/251/263"}, 
						             {id: "v15", firstName: "Kitten 15", lastName: "1", picture: "//placekitten.com/g/251/264"}, 
						             {id: "v16", firstName: "Kitten 16", lastName: "1", picture: "//placekitten.com/g/251/265"}],
						interests : ["Animals", "Education", "Environment", "People", "Recreation"]
					}
					],
					organizers : [{id : "org1", firstName : "org1", lastName: "1"},
					              {id : "org2", firstName : "org2", lastName: "1", picture : "//placekitten.com/g/351/350/"},
					              {id : "org3", firstName : "org3", lastName: "1", picture : "//placekitten.com/g/352/350/"},
					              {id : "org4", firstName : "org4", lastName: "1", picture : "//placekitten.com/g/353/350/"},
					              {id : "org5", firstName : "org5", lastName: "1"},
					              {id : "org6", firstName : "org6", lastName: "1", picture : "//placekitten.com/g/355/350/"}],
					subscribers : [{id : "sub1", firstName : "sub1", lastName: "1", picture : "//placekitten.com/g/350/355/"},
					               {id : "sub2", firstName : "sub2", lastName: "1", picture : "//placekitten.com/g/351/355/"},
					               {id : "sub3", firstName : "sub3", lastName: "1", picture : "//placekitten.com/g/352/355/"},
					               {id : "sub4", firstName : "sub4", lastName: "1"},
					               {id : "sub5", firstName : "sub5", lastName: "1", picture : "//placekitten.com/g/354/355/"},
					               {id : "sub6", firstName : "sub6", lastName: "1", picture : "//placekitten.com/g/355/355/"},
					               {id : "sub7", firstName : "sub7", lastName: "1", picture : "//placekitten.com/g/350/355/"},
					               {id : "sub8", firstName : "sub8", lastName: "1", picture : "//placekitten.com/g/356/355/"},
					               {id : "sub9", firstName : "sub9", lastName: "1"},
					               {id : "sub10", firstName : "sub10", lastName: "1", picture : "//placekitten.com/g/358/355/"}],
					interests : ["Animals", "Environment", "People", "Recreation", "Technology", "Youth"]
			};
			buildInterests();
		}
		
		// Build the interests for editing
		// Get Subscribers by ID
		$scope.loaded = true;
		
		
		
		
		
		$scope.searchUsers = function() {
			$scope.searchResultsPristine = true;
			$scope.isSearching = true;
			// Get search results from server
			$scope.searchResults = [{
				id :			"huy",
				firstName : 	"Huy",
				lastName : 		"Le"
			},{
				id :			"kris",
				firstName : 	"Kristopher",
				lastName : 		"Tadlock",
				picture : 		"//placekitten.com/g/1001/1001/"
			},{
				id :			"vadzim",
				firstName : 	"Vadzim",
				lastName : 		"LN",
				picture : 		"//placekitten.com/g/1002/1002/"
			},{
				id :			"shane",
				firstName : 	"Shane",
				lastName : 		"Singh",
				picture : 		"//placekitten.com/g/1003/1003/"
			},{
				id :			"john",
				firstName : 	"John",
				lastName : 		"LN",
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
		 * Building Functions
		 **************************************************************************/		
		function buildInterests() {
			angular.forEach($scope.group.interests, function(interest) {
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


		/***************************************************************************
		 * Adding/Removing Interests Function
		 **************************************************************************/
		$scope.addInterest = function (interest) {
			var hasInterest = false;
			var newInterests = [];
			angular.forEach($scope.group.interests, function(currentInterest, index) {
				//console.log(currentInterest.type);
				if (currentInterest === interest){
					//console.log("removed " + interest);
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
				else {
					//console.log(currentInterest);
					newInterests.push(currentInterest);
				}
			});
			if (hasInterest === false){
				//console.log("added " + interest);
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
			$scope.group.interests = newInterests;
			//console.log($scope.group.interests);
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

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
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
		  
		/***********************************************************************
		 * Boolean Functions
		 **********************************************************************/		
		/*
		 * Used to check if a social media object exists
		 */
		$scope.checkIfHas = function(type) {
			if ($scope.group != null){
				switch(type){
				case "googlePlus":
					if ($scope.group.googlePlusURL != null) 
						if($scope.group.googlePlusURL.length > 0)
							return true;
					break;
				case "facebook":
					if ($scope.group.facebookURL != null)
						if($scope.group.facebookURL.length > 0)
							return true;
					break;
				case "twitter":
					if ($scope.group.twitterURL != null)
						if ($scope.group.twitterURL.length > 0)
							return true;
					break;
				case "linkedIn":
					if ($scope.group.linkedInURL != null)
						if ($scope.group.linkedInURL.length > 0)
							return true;
					break;
				case "website":
					if ($scope.group.personalWebsiteURL != null)
						if ($scope.group.personalWebsiteURL.length > 0)
							return true;
					break;
				}
			}
			
			return false;
		}

		/*
		 * Checks if there are more than 1 upcoming events, the view will display
		 * arrows to move across events if that is the case.
		 */
		$scope.hasMultipleEvents = function() {
			if ($scope.group.events != null){
				if ($scope.group.events.length >= 2)
					return true;
				else
					return false;
			}
			else
				return false;
		}
		
		/*
		 * Checks if there are more than n organizers
		 */
		$scope.hasOrganizers = function(amount) {
			if ($scope.group.organizers != null){
				if ($scope.group.organizers.length >= amount)
					return true;
				else
					return false;
			}
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
		/***********************************************************************
		 * Editing Functions
		 **********************************************************************/
		$scope.getIsEditing = function() {
			if ($scope.isEditing === true)
				return true;
			else
				return false;
		}
		
		$scope.enableEdit = function() {
			$scope.isEditing = true;
			
			// Backup contents on page
			$scope.group_bak = {};
			angular.copy($scope.group, $scope.group_bak);
		}

		$scope.cancelEdit = function() {
			$scope.isEditing = false;
			
			// Restore contents on page
			angular.copy($scope.group_bak, $scope.group);
			$scope.group_bak = {};
			
			// Reset interests for editing
			clearInterests();
			buildInterests();
		}

		$scope.submitEdit = function() {
			$scope.isUpdating = true;
			// Send changes to server
			GroupService.put({id: $routeParams.groupId, group: $scope.group}, function(res) {
				switch(res.data.flag){
				case true:
					$scope.group = res.data.group;
					$scope.alerts.push({type: "success", msg: res.data.msg});
					$timeout(function() {
						$scope.isEditing = false;
						$scope.isUpdating = false;
					}, 3000);
					break;
				case false:
					$scope.alerts.push({type: "danger", msg: res.data.msg});
					$timeout(function() {
						$scope.isUpdating = false;
					}, 3000);
					break;
				}
			});
			// Keep changes made
			$scope.group_bak = {};
			$scope.animalsSelected_bak = "";
			$scope.educationSelected_bak = "";
			$scope.environmentSelected_bak = "";
			$scope.peopleSelected_bak = "";
			$scope.recreationSelected_bak = "";
			$scope.technologySelected_bak = "";
			$scope.youthSelected_bak = "";
		}

		/***************************************************************************
		 * Subscribe Button
		 **************************************************************************/
		$scope.subscribe = function() {
			
		}
		
		/***************************************************************************
		 * Admin Testing
		 **************************************************************************/
		$scope.toggleAdmin = function() {
			$scope.isAdmin = !$scope.isAdmin;
		}

		
		/***************************************************************************
		 * MISC Functions
		 **************************************************************************/
		/*
		 * Opens an external link
		 */
		$scope.goTo = function(url) {
			if (url.indexOf("//") > -1)
				$window.open(url, '_blank');
			else{
				var validURL = "//" + url;
				$window.open(validURL, '_blank');
			}
				
		}
		
	} ]);
