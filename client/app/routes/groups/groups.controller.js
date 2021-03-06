'use strict';

angular.module('seniorprojectYoApp')
    .controller('GroupsCtrl', function($scope, $stateParams, $window, $filter, $anchorScroll, $location, $timeout, GroupService, UserService, EventService, PicUploadService, Auth) {

        /***************************************************************************
         * Variables (includes ones from scope too)
         **************************************************************************/
        $scope.isAdmin = false;
        $scope.isEditing = false;
        $scope.isSearching = false;
        $scope.isUpdating = false;
        $scope.submitted = false;
        $scope.isSubbing = false;
        $scope.isBusy = false;
        $scope.isLoaded = false;

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

        $scope.selectedTab = "Upcoming Events";
        $scope.otherTabs = ["Past Events"];


        /***************************************************************************
         * Get Functions
         **************************************************************************/
        // Get group data
        Auth.isLoggedInAsync(function(success) {
            if (Auth.isLoggedIn()) {
                $scope.user = Auth.getCurrentUser();
            }
            // Gets the group data from server
            if ($stateParams.groupId) {
                GroupService.show($stateParams.groupId, function(res) {
                    if (res.status === 404) {
                        $scope.alerts.push({type: "danger", msg: "There was a problem retrieving group."});
                    } else {
                        $scope.group = res.data.group;
                        //console.log($scope.group);
                        populate();
                        checkAdmin();
                    }
                });
            } else {
                //console.log("no group found");
            }

        });

        function populate() {
            populateGroup();
            populateSubscribers();
            if (Auth.isLoggedIn()) {
                populateUser();
            }
            else {
                $scope.isLoaded = true;
            }
        }

        function populateGroup() {
            // Populate organizers
            GroupService.organizers.index($scope.group._id, {}, function(res) {
                $scope.group.organizers = res.data;
            });


            // Populate events
            GroupService.events.index($scope.group._id, {}, function(res) {
                //console.log(res.data);
                $scope.group.events = res.data;
            });
        };

        function populateSubscribers() {
            // Populate subscribers
            GroupService.volunteers.index($scope.group._id, {}, function(res) {
                //console.log(res.data);
                $scope.group.volunteers = res.data;
            });
        }

        function populateUser() {
            // VolunteeredTo
            UserService.events.volunteeredTo.index($scope.user._id, {}, function(res) {
                $scope.user.events.volunteeredTo = res.data;
            });

            // Populate subscriptions
            UserService.groups.volunteeredTo.index($scope.user._id, {}, function(res) {
                $scope.user.groups.volunteeredTo = res.data;
                $scope.isLoaded = true;
            });

        };

        function checkAdmin() {
            if (Auth.isLoggedIn()) {
                // Populate required user data first
                UserService.groups.organizerOf.index($scope.user._id, {}, function(res) {
                    $scope.user.groups.organizerOf = res.data;

                    for (var i = 0; i < $scope.user.groups.organizerOf.length; i++){
                        if ($scope.user.groups.organizerOf[i]._id == $stateParams.groupId){
                            $scope.isAdmin = true;
                            break;
                        }
                    }
                });
            }
            else {
                $scope.isAdmin = false;
            }
        }

        /***********************************************************************
         * Functions that controls tabs for searching
         **********************************************************************/
        $scope.setCurrentTab = function(newTab) {
            $scope.selectedTab = newTab;

            switch (newTab) {
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
         * Searching for organizers
         **************************************************************************/
        $scope.searchUsers = function() {
            $scope.searchResultsPristine = true;
            $scope.isSearching = true;
            // Get search results from server
            $scope.searchResults = [{
                _id: "huy",
                firstName: "Huy",
                lastName: "Le"
            }, {
                _id: "kris",
                firstName: "Kristopher",
                lastName: "Tadlock",
                picture: "//placekitten.com/g/1001/1001/"
            }, {
                _id: "vadzim",
                firstName: "Vadzim",
                lastName: "LN",
                picture: "//placekitten.com/g/1002/1002/"
            }, {
                _id: "shane",
                firstName: "Shane",
                lastName: "Singh",
                picture: "//placekitten.com/g/1003/1003/"
            }, {
                _id: "john",
                firstName: "John",
                lastName: "LN",
                picture: "//placekitten.com/g/1004/1004/"
            }];

            // If the user is already in Organizers to be added list, give the CSS style to that user
            angular.forEach($scope.organizersToAdd, function(currentOrganizerToAdd) {
                angular.forEach($scope.searchResults, function(currentSearchResult) {
                    if (currentSearchResult._id === currentOrganizerToAdd._id)
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
            angular.forEach($scope.group.interests, function(currentInterest, index) {
                //console.log(currentInterest.type);
                if (currentInterest === interest) {
                    //console.log("removed " + interest);
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
                    //console.log(currentInterest);
                    newInterests.push(currentInterest);
                }
            });
            if (hasInterest === false) {
                //console.log("added " + interest);
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
            if ($scope.organizersToAdd.length > 0) {
                // Checks if user has already been added
                angular.forEach($scope.organizersToAdd, function(currentOrganizerToAdd) {
                    // If user is already in the array, flag will be true
                    if (currentOrganizerToAdd._id === $scope.searchResults[index]._id) {
                        //console.log(currentOrganizerToAdd + "already added");
                        alreadyAdded = true;
                    }
                });
            }
            // If not added yet, add to array + set class to show it has been added
            if (!alreadyAdded) {
                $scope.organizersToAdd.push($scope.searchResults[index]);
                $scope.searchResultsPristine = false;
                $scope.searchResults[index].added = "added";
            }
            //console.log($scope.organizersToAdd);
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
                if (currentOrganizerToAdd._id === $scope.organizersToAdd[index]._id) {
                    //console.log("removed " + currentOrganizerToAdd);
                    angular.forEach($scope.searchResults, function(currentSearchResult) {
                        if (currentSearchResult._id === currentOrganizerToAdd._id)
                            currentSearchResult.added = "";
                    });
                }
                // Otherwise, add organizer to be added to rebuilt array
                else {
                    //console.log(currentOrganizerToAdd);
                    newOrganizersToAdd.push(currentOrganizerToAdd);
                }
            });
            // Sets the rebuilt array
            $scope.organizersToAdd = newOrganizersToAdd;
            //console.log($scope.organizersToAdd);
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
            if ($scope.group != null) {
                switch (type) {
                    case "googlePlus":
                        if ($scope.group.googlePlusURL != null)
                            if ($scope.group.googlePlusURL.length > 0)
                                return true;
                        break;
                    case "facebook":
                        if ($scope.group.facebookURL != null)
                            if ($scope.group.facebookURL.length > 0)
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

        $scope.isSubscribed = function() {
            if ($scope.user != null) {
                if ($scope.group != null) {
                    for (var i = 0; i < $scope.user.groups.volunteeredTo.length; i++) {
                        if ($scope.user.groups.volunteeredTo[i]._id === $stateParams.groupId)
                            return true;
                    }
                }
            }

            return false;
        }


        /***********************************************************************
         * Editing Functions
         **********************************************************************/

        $scope.enableEdit = function() {
            $scope.isEditing = true;

            buildInterests();

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
            if ($scope.groupForm.$valid) {
                $scope.isUpdating = true;

                // Check to see if a new picture is inputted
                if ($scope.picFile) {
                    PicUploadService.picUpload($scope.picFile).then(function(data) {
                        $scope.group.picture = data.data;
                        $scope.picFile = null;

                        // Send changes to server
                        GroupService.update($stateParams.groupId, { group: $scope.group },
                            function(res) {  // success
                                $scope.group = res.data.group;
                                $scope.alerts.push({
                                    type: "success",
                                    msg: 'Group has been updated'
                                });

                                $scope.isEditing = false;
                                $scope.isUpdating = false;
                            },
                            function(res) {  //error
                                $scope.alerts.push({
                                    type: "danger",
                                    msg: 'There was a problem updating the group'
                                });

                                $scope.isUpdating = false;
                        });
                    });
                }
                else {
                    // Send changes to server
                    GroupService.update($stateParams.groupId, { group: $scope.group },
                        function(res) {  // success
                            $scope.group = res.data.group;
                            $scope.alerts.push({
                                type: "success",
                                msg: 'Group has been updated'
                            });

                            $scope.isEditing = false;
                            $scope.isUpdating = false;
                        },
                        function(res) {  //error
                            $scope.alerts.push({
                                type: "danger",
                                msg: 'There was a problem updating the group'
                            });

                            $scope.isUpdating = false;
                    });
                }


                // Keep changes made
                $scope.group_bak = {};
                $scope.animalsSelected_bak = "";
                $scope.educationSelected_bak = "";
                $scope.environmentSelected_bak = "";
                $scope.peopleSelected_bak = "";
                $scope.recreationSelected_bak = "";
                $scope.technologySelected_bak = "";
                $scope.youthSelected_bak = "";

                populate();
            }
            else {
                $scope.alerts.push({type: "danger", msg: "Errors found, please fix them."});
                $scope.submitted = true;
            }
        }

        /***************************************************************************
         * Subscribe Button
         **************************************************************************/
         $scope.subscribe = function() {
             if (Auth.isLoggedIn()) {

                 $scope.isSubbing = true;
                 GroupService.volunteers.create($scope.group._id, $scope.user._id, function(res) {
                     $scope.group.volunteers = res.data;
                     $scope.user = Auth.getCurrentUser();

                     populateSubscribers();
                     populateUser();

                     $scope.alerts.push({
                         type: "success",
                         msg: 'You have successfully subscribed'
                     });

                     $scope.isSubbing = false;
                 }, function(res) { // error
                     $scope.alerts.push({
                         type: "danger",
                         msg: 'There was a problem subscribing'
                     });
                     $scope.isSubbing = false;
                 });
             }
             else {
                 $location.path("/login").replace;
             }
         }

         $scope.unsubscribe = function() {
             if (Auth.isLoggedIn()) {

                 $scope.isSubbing = true;
                 GroupService.volunteers.destroy($scope.group._id, $scope.user._id, function(res) {
                     $scope.group.volunteers = res.data;
                     $scope.user = Auth.getCurrentUser();

                     populateSubscribers();
                     populateUser();

                     $scope.alerts.push({
                         type: "success",
                         msg: 'You have successfully unsubscribed'
                     });

                     $scope.isSubbing = false;
                 }, function(res) { // error
                     $scope.alerts.push({
                         type: "danger",
                         msg: 'There was a problem unsubscribing'
                     });
                     $scope.isSubbing = false;
                 });
             }
             else {
                 $location.path("/login").replace;
             }
         }

        /***************************************************************************
         * MISC Functions
         **************************************************************************/

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        }

    });
