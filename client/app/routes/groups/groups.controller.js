'use strict';

angular.module('seniorprojectYoApp')
    .controller('GroupsCtrl', function($scope, $stateParams, $window, $filter, $anchorScroll, $location, $timeout, GroupService, UserService, EventService, Auth) {

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
                        $scope.errorMessage = 'There was a problem retrieving the group';
                    } else {
                        $scope.group = res.data.group;
                        console.log($scope.group);
                        populate();
                        checkAdmin();
                    }
                });
            } else {
                console.log("no group found");
            }

        });

        function populate() {
            populateGroup();
            populateUser();
        }

        function populateGroup() {
            // Populate organizers
            GroupService.organizers.index($scope.group._id, {}, function(res) {
                $scope.group.organizers = res.data;
            });

            // Populate subscribers
            GroupService.volunteers.index($scope.group._id, {}, function(res) {
                console.log(res.data);
                $scope.group.volunteers = res.data;
            });

            // Populate events
            GroupService.events.index($scope.group._id, {}, function(res) {
                console.log(res.data);
                $scope.group.events = res.data;

                // Populate organizers + volunteers for events
                angular.forEach($scope.group.events, function(event) {
                    EventService.organizers.index(event._id, {}, function (res) {
                        event.organizers = res.data;

                        EventService.volunteers.index(event._id, {}, function(res) {
                            event.volunteers = res.data;
                        });
                    });
                });
            });
        };

        function populateUser() {
            // VolunteeredTo
            UserService.events.volunteeredTo.index($scope.user._id, {}, function(res) {
                $scope.user.events.volunteeredTo = res.data;
            });

            // Populate subscriptions
            UserService.groups.volunteeredTo.index($scope.user._id, {}, function(res) {
                $scope.user.groups.volunteeredTo = res.data;
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
                        console.log(currentOrganizerToAdd + "already added");
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
                if (currentOrganizerToAdd._id === $scope.organizersToAdd[index]._id) {
                    console.log("removed " + currentOrganizerToAdd);
                    angular.forEach($scope.searchResults, function(currentSearchResult) {
                        if (currentSearchResult._id === currentOrganizerToAdd._id)
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
         * Volunteer Button
         **************************************************************************/
         $scope.volunteer = function(curEvent) {
             if (Auth.isLoggedIn()) {
                 var eventIndex = $scope.group.events.indexOf($filter('filter')($scope.group.events, {_id: curEvent._id}, true)[0]);
                 // Get updated event before trying to
                 EventService.show($scope.group.events[eventIndex]._id, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the event';
                     } else {
                         $scope.group.events[eventIndex] = res.data.event;
                         if ($scope.group.events[eventIndex].volunteers.length >= $scope.group.events[eventIndex].maxVolunteers){
                             $scope.alerts.push({
                                 type: "warning",
                                 msg: 'Event is full.'
                             });
                         }
                         else {
                             $scope.isBusy = true;

                             $scope.user = Auth.getCurrentUser();

                             $scope.user.events.volunteeredTo.push($scope.group.events[eventIndex]);

                             UserService.update($scope.user._id, { user: $scope.user },
                                 function(res) {  // success
                                     //$scope.user = res.data.user;
                                     console.log(res.data.user);
                                     $scope.group.events[eventIndex].volunteers.push(res.data.user);

                                     EventService.update($scope.group.events[eventIndex]._id, { event: $scope.group.events[eventIndex] },
                                         function(res) {  // success
                                             //$scope.group.events[eventIndex] = res.data.event;
                                             console.log(res.data.event);

                                             //populateGroup();

                                             $scope.alerts.push({
                                                 type: "success",
                                                 msg: 'You have successfully volunteered'
                                             });

                                             $scope.isBusy = false;

                                         },
                                         function(res) {  //error
                                             $scope.alerts.push({
                                                 type: "danger",
                                                 msg: 'There was a problem volunteering'
                                             });
                                         });

                                     },
                                     function(res) {  // error
                                         $scope.alerts.push({
                                             type: "danger",
                                             msg: 'There was a problem volunteering'
                                         });
                                     });
                                 }
                             }
                         });
                     }
                     else {
                         $location.path("/login/").replace;
                     }
                 }

         $scope.optOut = function(curEvent) {
             if (Auth.isLoggedIn()) {
                 var eventIndex = $scope.group.events.indexOf($filter('filter')($scope.group.events, {_id: curEvent._id}, true)[0]);
                 // Get updated event before trying to
                 EventService.show($scope.group.events[eventIndex]._id, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the event';
                     } else {
                         $scope.group.events[eventIndex] = res.data.event;

                         EventService.volunteers.index($scope.group.events[eventIndex]._id, {}, function(res) {
                             $scope.group.events[eventIndex].volunteers = res.data;

                             $scope.isBusy = true;

                             $scope.user = Auth.getCurrentUser();

                             // Remove event from user volunteer list
                             for (var i = 0; i < $scope.user.events.volunteeredTo.length; i++) {
                                 if ($scope.user.events.volunteeredTo[i]._id === $scope.group.events[eventIndex]._id){
                                     $scope.user.events.volunteeredTo.splice(i, 1);
                                 }
                             }

                             // Remove user from event volunteer list
                             for (var i = 0; i < $scope.group.events[eventIndex].volunteers.length; i++) {
                                 if ($scope.group.events[eventIndex].volunteers[i]._id === $scope.user._id){
                                     $scope.group.events[eventIndex].volunteers.splice(i, 1);
                                 }
                             }

                             UserService.update($scope.user._id, { user: $scope.user },
                                 function(res) {  // success
                                     //$scope.user = res.data.user;
                                     console.log(res.data.user);

                                     EventService.update($scope.group.events[eventIndex]._id, { event: $scope.group.events[eventIndex] },
                                         function(res) {  // success
                                             //$scope.group.events[eventIndex] = res.data.event;
                                             console.log(res.data.event);

                                             //populateGroup();

                                             $scope.alerts.push({
                                                 type: "success",
                                                 msg: 'You have successfully opted out'
                                             });

                                             $scope.isBusy = false;

                                         },
                                         function(res) {  //error
                                             $scope.alerts.push({
                                                 type: "danger",
                                                 msg: 'There was a problem opting out'
                                             });
                                         });

                                     },
                                     function(res) {  // error
                                         $scope.alerts.push({
                                             type: "danger",
                                             msg: 'There was a problem opting out'
                                         });
                                     });
                                 });

                             }
                         });
                     }
                     else {
                         $location.path("/login/").replace;
                     }

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

        /*
         * Checks if there are more than 1 upcoming events, the view will display
         * arrows to move across events if that is the case.
         */
        $scope.hasMultipleEvents = function() {
            if ($scope.group.events != null) {
                if ($scope.group.events.length >= 2)
                    return true;
                else
                    return false;
            } else
                return false;
        }

        /*
         * Checks if there are more than n organizers
         */
        $scope.hasOrganizers = function(amount) {
            if ($scope.group.organizers != null) {
                if ($scope.group.organizers.length >= amount)
                    return true;
                else
                    return false;
            } else
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

        $scope.isVolunteering = function(curEvent) {
            if ($scope.user != null){
                for (var i = 0; i < curEvent.volunteers.length; i++) {
                    if (curEvent.volunteers[i]._id === $scope.user._id)
                        return true;
                }
            }
            return false;
        }

        $scope.isOrganizer = function(curEvent) {
            if ($scope.user != null){
                for (var i = 0; i < curEvent.organizers.length; i++) {
                    if (curEvent.organizers[i]._id === $scope.user._id)
                        return true;
                }
            }
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
        $scope.getIsEditing = function() {
            if ($scope.isEditing === true)
                return true;
            else
                return false;
        }

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

                 GroupService.show($scope.group._id, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the group';
                     } else {
                         $scope.group.volunteers = res.data.group.volunteers;

                         GroupService.volunteers.index($scope.group._id, {}, function(res) {
                             $scope.group.volunteers = res.data;

                             $scope.isSubbing = true;

                             $scope.user = Auth.getCurrentUser();

                             $scope.user.groups.volunteeredTo.push($scope.group);

                             UserService.update($scope.user._id, { user: $scope.user },
                                 function(res) {  // success
                                     //$scope.user = res.data.user;
                                     console.log(res.data.user);
                                     $scope.group.volunteers.push(res.data.user);

                                     GroupService.update($stateParams.groupId, { group: $scope.group },
                                         function(res) {  // success
                                             //$scope.group = res.data.group;
                                             console.log(res.data.group);

                                             //populate();

                                             $scope.alerts.push({
                                                 type: "success",
                                                 msg: 'You have successfully subscribed'
                                             });

                                             $scope.isSubbing = false;

                                         },
                                         function(res) {  //error
                                             $scope.alerts.push({
                                                 type: "danger",
                                                 msg: 'There was a problem subscribing2'
                                             });
                                         });
                                     },
                                     function(res) {  // error
                                         $scope.alerts.push({
                                             type: "danger",
                                             msg: 'There was a problem subscribing1'
                                         });
                                     });
                                 });
                             }
                         });


                     }
                     else {
                         $location.path("/login/").replace;
                     }
                 }

        $scope.unsubscribe = function() {
            if (Auth.isLoggedIn()) {
                GroupService.show($scope.group._id, function(res) {
                    if (res.status === 404) {
                        $scope.errorMessage = 'There was a problem retrieving the group';
                    } else {
                        $scope.group.volunteers = res.data.group.volunteers;

                        GroupService.volunteers.index($scope.group._id, {}, function(res) {
                            $scope.group.volunteers = res.data;


                            $scope.isSubbing = true;

                            $scope.user = Auth.getCurrentUser();

                            // Remove group from user subscription list
                            for (var i = 0; i < $scope.user.groups.volunteeredTo.length; i++) {
                                if ($scope.user.groups.volunteeredTo[i]._id === $stateParams.groupId){
                                    $scope.user.groups.volunteeredTo.splice(i, 1);
                                }
                            }

                            // Remove user from group subscription list
                            for (var i = 0; i < $scope.group.volunteers.length; i++) {
                                if ($scope.group.volunteers[i]._id === $scope.user._id){
                                    $scope.group.volunteers.splice(i, 1);
                                }
                            }

                            UserService.update($scope.user._id, { user: $scope.user },
                                function(res) {  // success
                                    //$scope.user = res.data.user;

                                    GroupService.update($stateParams.groupId, { group: $scope.group },
                                        function(res) {  // success
                                            //$scope.group = res.data.group;

                                            //populate();

                                            $scope.alerts.push({
                                                type: "success",
                                                msg: 'You have successfully unsubscribed'
                                            });

                                            $scope.isSubbing = false;

                                        },
                                        function(res) {  //error
                                            $scope.alerts.push({
                                                type: "danger",
                                                msg: 'There was a problem unsubscribing'
                                            });
                                        });
                                    },
                                    function(res) {  // error

                                    });
                                });
                            }
                        });
                    }
                    else {
                        $location.path("/login/").replace;
                    }
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
