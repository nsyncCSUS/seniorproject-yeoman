'use strict';

angular.module('seniorprojectYoApp')
    .controller('UsersCtrl', function($scope, $stateParams, $anchorScroll, $timeout, UserService, $http, Auth) {


        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isAdmin = true;
        $scope.isEditing = false;
        $scope.isUpdating = false;
        $scope.userId = $stateParams.id;
        $scope.alerts = [];
        $scope.errorMessage = '';

        $scope.animalsSelected = "";
        $scope.educationSelected = "";
        $scope.environmentSelected = "";
        $scope.peopleSelected = "";
        $scope.recreationSelected = "";
        $scope.technologySelected = "";
        $scope.youthSelected = "";


        $scope.selectedTab = "Volunteered To";
        $scope.otherTabs = ["Past Events", "Subscriptions"];

        /***************************************************************************
         * Get Functions
         **************************************************************************/
        // Gets the user data from server
        //        if ($stateParams.id != null && $stateParams.id != undefined) {
        if ($stateParams.id) {
            UserService.show($stateParams.id, function(res) {
                if (res.status === 404) {
                    $scope.errorMessage = 'There was a problem retrieving the user';
                } else {
                    $scope.user = res.data.user;
                    buildInterests();
                }
            });
        } else {
            $scope.user = {
                _id: "AnthonyNguyen",
                firstName: "Anthony",
                middleName: "middle",
                lastName: "Nguyen",
                picture: "//placekitten.com/g/500/500/",
                creationDate: "2015-08-26T18:50:10.111Z",
                city: "Sacramento",
                state: "CA",
                zipcode: 95828,
                description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac gravida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tincidunt molestie lacus, non molestie sem bland center",
                googlePlusURL: "www.google.com",
                facebookURL: "https://facebook.com",
                linkedInURL: "https://linkedin.com",
                twitterURL: "https://twitter.com",
                volunteeredTo: [{
                    _id: "event1",
                    creationUser: "",
                    group: "",
                    name: "Awesome Event Number 1 asdf asdf asdf asdf",
                    description: "sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac grav_ida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tinc_idunt molestie lacus, non molestie sem blandit non.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate pellentesque lorem. Donec erat ante, sodales malesuada accumsan vel, condimentum eget eros. Mauris consectetur nisi in ex pharetra commodo. Nullam aliquam velit sem, nec molestie risus eleifend ac. In fringilla, nisl ac grav_ida convallis, turpis eros accumsan urna, sed molestie tortor libero sit amet lacus. Nulla porttitor euismod purus, ut hendrerit leo vehicula sed. Aenean a lobortis metus, ut ornare erat. Suspendisse tinc_idunt molestie lacus, non molestie sem bland center",
                    picture: "//placekitten.com/g/501/500/",
                    startTimeDate: "2016-10-26T18:50:10.111Z",
                    endTimeDate: "2016-10-27T18:50:10.111Z",
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

                }, {
                    _id: "event2",
                    creationUser: "",
                    group: "",
                    name: "Awesome Event Number 2 asdf asdf asdf asdf",
                    description: "aaaaaaaaaa bbbbbbbbbbbbbbb cccccccccccccccc dddddddddddddddddd eeeeeeeeeeeeeeeeeee fffffffffffffffffff gggggggggggggggggg hhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjjjj",
                    picture: "//placekitten.com/g/503/500/",
                    street: "4321 cool st",
                    city: "Sacramento",
                    state: "CA",
                    zipcode: "95828",
                    startTimeDate: "2015-10-28T18:50:10.111Z",
                    endTimeDate: "2015-10-29T18:50:10.111Z",
                    maxVolunteers: 50,
                    volunteers: [{
                        _id: "v1",
                        firstName: "Kitten 1",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/250"
                    }, {
                        _id: "v2",
                        firstName: "Kitten 2",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/251"
                    }, {
                        _id: "v3",
                        firstName: "Kitten 3",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/252"
                    }, {
                        _id: "v4",
                        firstName: "Kitten 4",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/253"
                    }, {
                        _id: "v5",
                        firstName: "Kitten 5",
                        lastName: "1"
                    }, {
                        _id: "v6",
                        firstName: "Kitten 6",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/255"
                    }, {
                        _id: "v7",
                        firstName: "Kitten 7",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/256"
                    }, {
                        _id: "v8",
                        firstName: "Kitten 8",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/257"
                    }, {
                        _id: "v9",
                        firstName: "Kitten 9",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/258"
                    }, {
                        _id: "v10",
                        firstName: "Kitten 10",
                        lastName: "1"
                    }, {
                        _id: "v11",
                        firstName: "Kitten 11",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/260"
                    }, {
                        _id: "v12",
                        firstName: "Kitten 12",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/261"
                    }, {
                        _id: "v13",
                        firstName: "Kitten 13",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/262"
                    }, {
                        _id: "v14",
                        firstName: "Kitten 14",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/263"
                    }, {
                        _id: "v15",
                        firstName: "Kitten 15",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/264"
                    }, {
                        _id: "v16",
                        firstName: "Kitten 16",
                        lastName: "1",
                        picture: "//placekitten.com/g/251/265"
                    }],
                    interests: ["Animals", "Education", "Environment", "People", "Recreation"]
                }],
                organizers: [{
                    _id: "org1",
                    firstName: "org1",
                    lastName: "1"
                }, {
                    _id: "org2",
                    firstName: "org2",
                    lastName: "1",
                    picture: "//placekitten.com/g/351/350/"
                }, {
                    _id: "org3",
                    firstName: "org3",
                    lastName: "1",
                    picture: "//placekitten.com/g/352/350/"
                }, {
                    _id: "org4",
                    firstName: "org4",
                    lastName: "1",
                    picture: "//placekitten.com/g/353/350/"
                }, {
                    _id: "org5",
                    firstName: "org5",
                    lastName: "1"
                }, {
                    _id: "org6",
                    firstName: "org6",
                    lastName: "1",
                    picture: "//placekitten.com/g/355/350/"
                }],
                subscribers: [{
                    _id: "sub1",
                    firstName: "sub1",
                    lastName: "1",
                    picture: "//placekitten.com/g/350/355/"
                }, {
                    _id: "sub2",
                    firstName: "sub2",
                    lastName: "1",
                    picture: "//placekitten.com/g/351/355/"
                }, {
                    _id: "sub3",
                    firstName: "sub3",
                    lastName: "1",
                    picture: "//placekitten.com/g/352/355/"
                }, {
                    _id: "sub4",
                    firstName: "sub4",
                    lastName: "1"
                }, {
                    _id: "sub5",
                    firstName: "sub5",
                    lastName: "1",
                    picture: "//placekitten.com/g/354/355/"
                }, {
                    _id: "sub6",
                    firstName: "sub6",
                    lastName: "1",
                    picture: "//placekitten.com/g/355/355/"
                }, {
                    _id: "sub7",
                    firstName: "sub7",
                    lastName: "1",
                    picture: "//placekitten.com/g/350/355/"
                }, {
                    _id: "sub8",
                    firstName: "sub8",
                    lastName: "1",
                    picture: "//placekitten.com/g/356/355/"
                }, {
                    _id: "sub9",
                    firstName: "sub9",
                    lastName: "1"
                }, {
                    _id: "sub10",
                    firstName: "sub10",
                    lastName: "1",
                    picture: "//placekitten.com/g/358/355/"
                }],
                creatorOf: [{
                    _id: "nsync",
                    name: "N.Sync().......... .............. ................ ............. ..........................",
                    picture: "//placekitten.com/g/500/500/"
                }, {
                    _id: "nsync2",
                    name: "N.Sync().......... .............. ",
                    picture: "//placekitten.com/g/500/500/"
                }, {
                    _id: "nsync3",
                    name: "N.Sync().......... ",
                    picture: "//placekitten.com/g/500/500/"
                }, {
                    _id: "nsync4",
                    name: "N.Sync().......... ............",
                    picture: "//placekitten.com/g/500/500/"
                }],
                organizerOf: [],
                subscribedTo: [{
                    _id: "nsync",
                    name: "N.Sync().......... .............. ................ ............. ..........................",
                    picture: "//placekitten.com/g/500/500/"
                }, {
                    _id: "nsync2",
                    name: "N.Sync().......... .............. ",
                    picture: "//placekitten.com/g/500/500/"
                }, {
                    _id: "nsync3",
                    name: "N.Sync().......... ",
                    picture: "//placekitten.com/g/500/500/"
                }, {
                    _id: "nsync4",
                    name: "N.Sync().......... ............",
                    picture: "//placekitten.com/g/500/500/"
                }],
                interests: ["Animals", "Environment", "People", "Recreation", "Technology", "Youth"]
            };
            buildInterests();
        }

        /***********************************************************************
         * Functions that controls tabs for searching
         **********************************************************************/
        $scope.setCurrentTab = function(newTab) {
            $scope.selectedTab = newTab;
            console.log(newTab.replace(/\s/g, ''))
            switch (newTab) {
                case "Volunteered To":
                    $scope.otherTabs[0] = "Past Events";
                    $scope.otherTabs[1] = "Subscriptions";
                    break;
                case "Past Events":
                    $scope.otherTabs[0] = "Volunteered To";
                    $scope.otherTabs[1] = "Subscriptions";
                    break;
                case "Subscriptions":
                    $scope.otherTabs[0] = "Volunteered To";
                    $scope.otherTabs[1] = "Past Events";
                    break;
            }

            $timeout(function() {
                $anchorScroll('tabs');
            }, 1);
        }

        $scope.getCurrentTab = function(tabName) {
            return $scope.selectedTab === tabName;
        }

        /***************************************************************************
         * Building Functions
         **************************************************************************/
        function buildInterests() {
            angular.forEach($scope.user.interests, function(interest) {
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

        /***************************************************************************
         * Adding/Removing Interests Function
         **************************************************************************/
        $scope.addInterest = function(interest) {
            var hasInterest = false;
            var newInterests = [];
            angular.forEach($scope.user.interests, function(currentInterest, index) {
                if (currentInterest === interest) {
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
                } else {
                    newInterests.push(currentInterest);
                }
            });

            if (hasInterest === false) {
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

            $scope.user.interests = newInterests;
        };
        /***********************************************************************
         * Editing Functions
         **********************************************************************/
        $scope.getIsEditing = function() {
            return $scope.isEditing;
        }

        $scope.enableEdit = function() {
            $scope.isEditing = true;

            // Backup contents on page
            $scope.user_bak = {};
            angular.copy($scope.user, $scope.user_bak);
        }

        $scope.cancelEdit = function() {
            $scope.isEditing = false;

            // Restore contents on page
            angular.copy($scope.user_bak, $scope.user);
            $scope.user_bak = {};

            // Reset interests for editing
            clearInterests();
            buildInterests();
        }

        $scope.submitEdit = function() {
            $scope.isUpdating = true;

            // Keep changes made
            $scope.user_bak = {};
            $scope.animalsSelected_bak = "";
            $scope.educationSelected_bak = "";
            $scope.environmentSelected_bak = "";
            $scope.peopleSelected_bak = "";
            $scope.recreationSelected_bak = "";
            $scope.technologySelected_bak = "";
            $scope.youthSelected_bak = "";

            console.log('In submitUser');
            UserService.update($stateParams.id, {
                user: $scope.user
            }, function(res) {
                console.log('Updated');
                console.log(res.data);
                console.log(res.data.user);
                $scope.user = res.data.user;
//                $scope.alerts.push({
//                    type: "success",
//                    msg: res.data.msg
//                });

                $scope.isEditing = false;
                $scope.isUpdating = false;
            }, function(res) {
//                $scope.alerts.push({
//                    type: "danger",
//                    msg: res.data.msg
//                });

                $scope.isUpdating = false;
            });
        }

        /***********************************************************************
         * Boolean Functions
         **********************************************************************/
        /*
         * Used to check if a social media object exists
         */
        $scope.checkIfHas = function(type) {
            if ($scope.user != null) {
                switch (type) {
                    case "googlePlus":
                        if ($scope.user.googlePlusURL != null)
                            if ($scope.user.googlePlusURL.length > 0)
                                return true;
                        break;
                    case "facebook":
                        if ($scope.user.facebookURL != null)
                            if ($scope.user.facebookURL.length > 0)
                                return true;
                        break;
                    case "twitter":
                        if ($scope.user.twitterURL != null)
                            if ($scope.user.twitterURL.length > 0)
                                return true;
                        break;
                    case "linkedIn":
                        if ($scope.user.linkedInURL != null)
                            if ($scope.user.linkedInURL.length > 0)
                                return true;
                        break;
                    case "website":
                        if ($scope.user.personalWebsiteURL != null)
                            if ($scope.user.personalWebsiteURL.length > 0)
                                return true;
                        break;
                }
            }

            return false;
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
            else {
                var validURL = "//" + url;
                $window.open(validURL, '_blank');
            }

        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

    });
