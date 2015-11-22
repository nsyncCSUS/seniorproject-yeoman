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
         // Get user data
         Auth.isLoggedInAsync(function(success) {
             // Gets the user data from server
             if ($stateParams.userId) {
                 UserService.show($stateParams.userId, function(res) {
                     if (res.status === 404) {
                         $scope.errorMessage = 'There was a problem retrieving the user';
                     } else {
                         $scope.user = res.data.user;
                         populateUser();
                         checkAdmin();
                     }
                 });
             } else {
                 console.log("no user found");
             }

         });

         function populateUser() {
             // VolunteeredTo
             UserService.events.volunteeredTo.index($scope.user._id, {}, function(res) {
                 $scope.user.events.volunteeredTo = res.data;
             });

             // Populate subscriptions
             UserService.groups.volunteeredTo.index($scope.user._id, {}, function(res) {
                 $scope.user.groups.subscriptions = res.data;
             });

         };

         function checkAdmin() {
             if (Auth.isLoggedIn()) {
                 if (Auth.getCurrentUser()._id == $stateParams.userId){
                     $scope.isAdmin = true;
                 }
                 else {
                     $scope.isAdmin = false;
                 }
             }
         }
        /***********************************************************************
         * Functions that controls tabs for searching
         **********************************************************************/
        $scope.setCurrentTab = function(newTab) {
            $scope.selectedTab = newTab;
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

            buildInterests();

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
