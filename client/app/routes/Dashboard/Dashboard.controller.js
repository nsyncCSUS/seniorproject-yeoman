'use strict';

angular.module('seniorprojectYoApp')
    .controller('DashboardCtrl', function($scope) {
        $scope.message = 'Hello';

        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/


        // Call service function with a callback. The first argument 
        // is the data you want to pass to the Http request, and the 
        // second argument is a function to be called when the Http
        // request returns with a successful status code. Then reassign
        // $scope.event to the new event object we receive from the Http
        // response. 

        /* EventService.getEvent({id: 1}, function(response) {	
        	$scope.event = response.event; 
		
        });
        EventService.getEvent({startTimeDate: event.startTimeDate}, function(response){
        	$scope.event = response.event;
        }); */

        //		$scope.user = {
        //				firstName : 	"",
        //				middleName : 	"",
        //				lastName : 		"",
        //				description : 	"",
        //				picture:		"",
        //				email : 		"",
        //				birthday : 		"",
        //				age : 			"",
        //				city : 			"",
        //				state : 		"",
        //				zipCode : 		"",
        //				phoneNum : 		"",
        //				googlePlus : 	"",
        //				facebook : 		"",
        //				linkedIn : 		"",
        //				twitter : 		"",
        //				volunteeredTo : [{id: ""}, {id: ""}],
        //				creatorOf : 	[{id: ""}, {id: ""}],
        //				organizerOf : 	[{id: ""}, {id: ""}],
        //				subscribedTo : 	[{id: ""}, {id: ""}],
        //				interests : 	[{type: ""}, {type: ""}]
        //			};

        $scope.user = {
            firstName: "",
            middleName: "",
            lastName: "",
            description: "",
            picture: "",
            email: "",
            birthday: "",
            age: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNum: "",
            googlePlus: "",
            facebook: "",
            linkedIn: "",
            twitter: "",
            volunteeredTo: [{
                id: "event1",
                creatorId: "",
                group: {
                    id: "group1",
                    name: "Group 1"
                },
                name: "Awesome Event Number 1 asdf asdf asdf asdf",
                description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
                picture: "//placekitten.com/g/501/500/",
                startTimeDate: "2015-08-26T18:50:10.111Z",
                endTimeDate: "2015-08-27T18:50:10.111Z",
                street: "1234 cool st",
                city: "Sacramento",
                state: "CA",
                zipcode: "95828",
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
                interests: ["Animals", "Education", "Environment", "People", "Recreation", "Technology", "Youth"]

            }, {
                id: "event2",
                creatorId: "",
                group: {
                    id: "group2",
                    name: "Group 2"
                },
                name: "Awesome Event Number 2 asdf asdf asdf asdf",
                description: "aaaaaaaaaa bbbbbbbbbbbbbbb cccccccccccccccc dddddddddddddddddd eeeeeeeeeeeeeeeeeee fffffffffffffffffff gggggggggggggggggg hhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjjjj",
                picture: "//placekitten.com/g/504/500/",
                street: "6234 cool st",
                city: "Sacramento",
                state: "CA",
                zipcode: "95828",
                startTimeDate: "2015-10-28T18:50:10.111Z",
                endTimeDate: "2015-10-29T18:50:10.111Z",
                maxVolunteers: 50,
                volunteers: [{
                    id: "v1",
                    firstName: "Kitten 1",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/250"
                }, {
                    id: "v2",
                    firstName: "Kitten 2",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/251"
                }, {
                    id: "v3",
                    firstName: "Kitten 3",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/252"
                }, {
                    id: "v4",
                    firstName: "Kitten 4",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/253"
                }, {
                    id: "v5",
                    firstName: "Kitten 5",
                    lastName: "1"
                }, {
                    id: "v6",
                    firstName: "Kitten 6",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/255"
                }, {
                    id: "v7",
                    firstName: "Kitten 7",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/256"
                }, {
                    id: "v8",
                    firstName: "Kitten 8",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/257"
                }, {
                    id: "v9",
                    firstName: "Kitten 9",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/258"
                }, {
                    id: "v10",
                    firstName: "Kitten 10",
                    lastName: "1"
                }, {
                    id: "v11",
                    firstName: "Kitten 11",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/260"
                }, {
                    id: "v12",
                    firstName: "Kitten 12",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/261"
                }, {
                    id: "v13",
                    firstName: "Kitten 13",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/262"
                }, {
                    id: "v14",
                    firstName: "Kitten 14",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/263"
                }, {
                    id: "v15",
                    firstName: "Kitten 15",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/264"
                }, {
                    id: "v16",
                    firstName: "Kitten 16",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/265"
                }],
                interests: ["Animals", "Environment", "People", "Education"]
            }, {
                id: "event3",
                creatorId: "",
                group: {
                    id: "group3",
                    name: "Group 3"
                },
                name: "Awesome Event Number 3 asdf asdf asdf asdf",
                description: "aaaaaaaaaa bbbbbbbbbbbbbbb cccccccccccccccc dddddddddddddddddd eeeeeeeeeeeeeeeeeee fffffffffffffffffff gggggggggggggggggg hhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjjjj",
                picture: "//placekitten.com/g/503/500/",
                street: "4321 cool st",
                city: "Sacramento",
                state: "CA",
                zipcode: "95828",
                startTimeDate: "2015-08-28T18:50:10.111Z",
                endTimeDate: "2015-08-29T18:50:10.111Z",
                maxVolunteers: 50,
                volunteers: [{
                    id: "v1",
                    firstName: "Kitten 1",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/250"
                }, {
                    id: "v2",
                    firstName: "Kitten 2",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/251"
                }, {
                    id: "v3",
                    firstName: "Kitten 3",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/252"
                }, {
                    id: "v4",
                    firstName: "Kitten 4",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/253"
                }, {
                    id: "v5",
                    firstName: "Kitten 5",
                    lastName: "1"
                }, {
                    id: "v6",
                    firstName: "Kitten 6",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/255"
                }, {
                    id: "v7",
                    firstName: "Kitten 7",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/256"
                }, {
                    id: "v8",
                    firstName: "Kitten 8",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/257"
                }, {
                    id: "v9",
                    firstName: "Kitten 9",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/258"
                }, {
                    id: "v10",
                    firstName: "Kitten 10",
                    lastName: "1"
                }, {
                    id: "v11",
                    firstName: "Kitten 11",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/260"
                }, {
                    id: "v12",
                    firstName: "Kitten 12",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/261"
                }, {
                    id: "v13",
                    firstName: "Kitten 13",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/262"
                }, {
                    id: "v14",
                    firstName: "Kitten 14",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/263"
                }, {
                    id: "v15",
                    firstName: "Kitten 15",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/264"
                }, {
                    id: "v16",
                    firstName: "Kitten 16",
                    lastName: "1",
                    picture: "//placekitten.com/g/251/265"
                }],
                interests: ["Animals", "Education", "Environment", "People", "Recreation"]
            }],
            creatorOf: [{
                id: ""
            }, {
                id: ""
            }],
            organizerOf: [{
                id: "nsync",
                name: "N.Sync().......... .............. ................ ............. ..........................",
                picture: "//placekitten.com/g/500/500/"
            }, {
                id: "nsync2",
                name: "N.Sync().......... .............. ",
                picture: "//placekitten.com/g/500/500/"
            }, {
                id: "nsync3",
                name: "N.Sync().......... ",
                picture: "//placekitten.com/g/500/500/"
            }, {
                id: "nsync4",
                name: "N.Sync().......... ............",
                picture: "//placekitten.com/g/500/500/"
            }],
            subscribedTo: [{
                id: "nsync",
                name: "N.Sync().......... .............. ................ ............. ..........................",
                picture: "//placekitten.com/g/500/500/"
            }, {
                id: "nsync2",
                name: "N.Sync().......... .............. ",
                picture: "//placekitten.com/g/500/500/"
            }, {
                id: "nsync3",
                name: "N.Sync().......... ",
                picture: "//placekitten.com/g/500/500/"
            }, {
                id: "nsync4",
                name: "N.Sync().......... ............",
                picture: "//placekitten.com/g/500/500/"
            }]
        };

        $scope.selectedTab = "Upcoming Events";
        $scope.otherTabs = ["Past Events", "Recommended Events"];
        $scope.user.creationDate = new Date().getTime();

        /***********************************************************************
         * Building Functions
         **********************************************************************/

        /***********************************************************************
         * Functions that controls tabs for searching
         **********************************************************************/
        $scope.setCurrentTab = function(newTab) {
            $scope.selectedTab = newTab;

            switch (newTab) {
                case "Upcoming Events":
                    $scope.otherTabs[0] = "Past Events";
                    $scope.otherTabs[1] = "Recommended Events";
                    break;
                case "Past Events":
                    $scope.otherTabs[0] = "Upcoming Events";
                    $scope.otherTabs[1] = "Recommended Events";
                    break;
                case "Recommended Events":
                    $scope.otherTabs[0] = "Upcoming Events";
                    $scope.otherTabs[1] = "Past Events";
                    break;
            }
        }

        $scope.getCurrentTab = function(tabName) {
            if ($scope.selectedTab === tabName)
                return true;
            else
                return false;
        }

        /***********************************************************************
         * Boolean Functions
         **********************************************************************/
        /*
         * Checks if there are more than 1 upcoming events, the view will display
         * arrows to move across events if that is the case.
         */
        $scope.hasMultipleEvents = function() {
            if ($scope.upcomingEvents != null) {
                if ($scope.upcomingEvents.length >= 2)
                    return true;
                else
                    return false;
            } else
                return false;
        }

        /*
         * Checks if the gorup has a picture, the view will display a default
         * picture if no picture is found.
         */
        $scope.hasPicture = function(type1, index1, type2, index2) {
            switch (type1) {
                case "group":
                    if ($scope.group.picture != null) {
                        if ($scope.group.picture.length > 0)
                            return true;
                        else
                            return false;
                    } else {
                        if ($scope.loaded == false)
                            return true;
                        else
                            return false;
                    }
                case "organizer":
                    if ($scope.group.organizersBuilt != null) {
                        if ($scope.group.organizersBuilt[index1].organizers[index2].picture != null) {
                            if ($scope.group.organizersBuilt[index1].organizers[index2].picture.length > 0)
                                return true;
                            else
                                return false;
                        } else
                            return false;
                    }
                case "organizerXS":
                    if ($scope.group.organizersBuiltXS != null) {
                        if ($scope.group.organizersBuiltXS[index1].organizers[index2].picture != null) {
                            if ($scope.group.organizersBuiltXS[index1].organizers[index2].picture.length > 0)
                                return true;
                            else
                                return false;
                        } else
                            return false;
                    }
                case "subscriber":
                    if ($scope.group.subscribers != null) {
                        if ($scope.group.subscribers[index1].picture != null) {
                            if ($scope.group.subscribers[index1].picture.length > 0)
                                return true;
                            else
                                return false;
                        } else
                            return false;
                    }
                case "event":
                    if ($scope.upcomingEvents != null) {
                        if (type2 != null) {
                            switch (type2) {
                                case "volunteer":
                                    if ($scope.upcomingEvents[index1].volunteers[index2].picture != null) {
                                        if ($scope.upcomingEvents[index1].volunteers[index2].picture.length > 0)
                                            return true;
                                        else
                                            return false;
                                    }
                            }
                        } else {
                            if ($scope.upcomingEvents[index1].picture != null) {
                                if ($scope.upcomingEvents[index1].picture.length > 0)
                                    return true;
                                else
                                    return false;
                            } else
                                return false;
                        }
                    }
            }
        }

    });