'use strict';

angular.module('seniorprojectYoApp')
    .controller('EventsCtrl', function($scope) {
        $scope.message = 'Hello';


        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.eventId = $routeParams.eventId;


        /***************************************************************************
         * Admin Testing
         **************************************************************************/
        $scope.isAdmin = false;
        $scope.toggleAdmin = function() {
            $scope.isAdmin = !$scope.isAdmin;
        }

        /***************************************************************************
         * Dummy Data Testing
         **************************************************************************/
        $scope.isEditing = false;
        $scope.isSearching = false;
        $scope.currentDate = new Date();

        $scope.event = {
            id: "event1",
            creatorId: "",
            groupId: "",
            name: "SUPER DUPER AWESOME EVENT!!!!",
            description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
            picture: "//placekitten.com/g/501/500/",
            startTimeDate: "2015-08-26T18:50:10.111Z",
            endTimeDate: "2015-08-27T18:50:10.111Z",
            location: {
                street: "1234 cool st",
                city: "Sacramento",
                state: "CA",
                zipcode: "95828"
            },
            maxVolunteers: 50,
            volunteers: [{
                id: "v1",
                firstName: "Kitten 1",
                lastName: "1"
            }, {
                id: "v2",
                firstName: "Kitten 2",
                lastName: "1",
                picture: "//placekitten.com/g/250/251"
            }, {
                id: "v3",
                firstName: "Kitten 3",
                lastName: "1"
            }, {
                id: "v4",
                firstName: "Kitten 4",
                lastName: "1",
                picture: "//placekitten.com/g/250/253"
            }, {
                id: "v5",
                firstName: "Kitten 5",
                lastName: "1",
                picture: "//placekitten.com/g/250/254"
            }, {
                id: "v6",
                firstName: "Kitten 6",
                lastName: "1",
                picture: "//placekitten.com/g/250/255"
            }, {
                id: "v7",
                firstName: "Kitten 7",
                lastName: "1",
                picture: "//placekitten.com/g/250/256"
            }, {
                id: "v8",
                firstName: "Kitten 8",
                lastName: "1",
                picture: "//placekitten.com/g/250/257"
            }, {
                id: "v9",
                firstName: "Kitten 9",
                lastName: "1",
                picture: "//placekitten.com/g/250/258"
            }, {
                id: "v10",
                firstName: "Kitten 10",
                lastName: "1",
                picture: "//placekitten.com/g/250/259"
            }, {
                id: "v11",
                firstName: "Kitten 11",
                lastName: "1",
                picture: "//placekitten.com/g/250/260"
            }],
            interests: [{
                type: "Animals"
            }, {
                type: "Education"
            }, {
                type: "Environment"
            }, {
                type: "People"
            }, {
                type: "Recreation"
            }, {
                type: "Technology"
            }, {
                type: "Youth"
            }]
        };

        /*
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
        			if ($scope.loaded == false)
        				return true;
        			else
        				return false;
        		}
        	case "organizer":
        		if ($scope.group.organizers != null){
        			if ($scope.group.organizers[index1].picture != null){
        				if ($scope.group.organizers[index1].picture.length > 0)
        					return true;
        				else
        					return false;
        				}
        			else
        				return false;
        		}
        		else 
        			return false;
        	case "organizerBuilt":
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
        	case "organizerBuiltXS":
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
        		if ($scope.group.organizersToAdd != null){
        			if ($scope.group.organizersToAdd[index1].picture != null){
        				if ($scope.group.organizersToAdd[index1].picture.length > 0)
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
        }*/

    });