'use strict';

angular.module('seniorprojectYoApp')
.controller('HomeCtrl', function($scope, SearchService) {
    $scope.message = 'Hello';


    /***************************************************************************
    * Variables (includes ones from scope too)
    **************************************************************************/
    $scope.isSearching = false; // Default
    $scope.currentTab = 'events';

    $scope.search;
    $scope.category = 'Events';
    $scope.searchtext;
    $scope.usersSearchResults;
    $scope.groupsSearchResults;
    $scope.eventsSearchResults;
    $scope.searchbox = '';
    $scope.advancedSearchToggle = false;

    $scope.advbtn = 'Events';

    $scope.events = [];
    $scope.groups = [];
    $scope.users = [];

    SearchService.eventSearchAll().then(function(data) {
        //console.log(data.data);
        $scope.search.progress = 25;
        $scope.events = data.data;
        $scope.search.progress = 100;

    });



    /***************************************************************************
    * Initialize the search for users, groups, events based on keywords
    * 	- Search Users
    * 	- Search Groups
    * 	- Search Events
    **************************************************************************/
    $scope.search = function(searchbox) {
        $scope.search.progress = 25;
        if (searchbox == null){
            searchbox = 'all';
        }
        if (searchbox.length > 0) {
            $scope.isSearching = true;

            $scope.search.text = searchbox;

            $scope.search.progress = 50;
            for(let i of intrestArray){
                if(i !== undefined ){
                    intrestString += i;
                    intrestString +=' ';
                }

            }
            $scope.search.progress = 75;
            if ($scope.advbtn === 'Events') {
                SearchService.eventSearch($scope.search.text,intrestString)
                .then(function(data) {
                    //console.log(data.data);
                    $scope.events = data.data;
                    $scope.search.progress = 100;
                });

            } else if ($scope.advbtn === 'Groups') {
                SearchService.groupSearch($scope.search.text,intrestString)
                .then(function(data) {
                    //console.log(data.data);
                    $scope.groups = data.data;
                    $scope.search.progress = 100;
                });
            } else if ($scope.advbtn === 'People') {
                SearchService.peopleSearch($scope.search.text)
                .then(function(data) {
                    //console.log(data.data);
                    $scope.users = data.data;
                    $scope.search.progress = 100;
                });
            }
        }
        intrestString = '';
    };

    // Get Events
    //$scope.eventsSearchResults = HomeService.getEventSearchResults();
    // Get users
    //               $scope.usersSearchResults = HomeService.getUserSearchResults();
    // Get Groups
    //                $scope.groupsSearchResults = HomeService.getGroupSearchResults();


    $scope.getSearchBox = function() {
        if (typeof searchbox !== 'undefined') {
            return searchbox;
        } else {
            return '';
        }
    };

    /***************************************************************************
    * Functions that controls the view for searching or not search
    **************************************************************************/
    $scope.searching = function() {
        if ($scope.isSearching == true)
        return true;
        else
        return false;
    };
    $scope.stopSearching = function() {
        $scope.isSearching = false;
    };

    /***************************************************************************
    * Functions that controls tabs for searching
    **************************************************************************/
    $scope.setCurrentTab = function(category) {
        $scope.currentTab = category;
    };

    $scope.getSearchType = function(category) {
        if (category === $scope.advbtn) {
            return true;
        } else {
            return false;
        }

        if (category === $scope.advbtn) {
            return true;
        } else {
            return false;
        }

        if (category === $scope.advbtn) {
            return true;
        } else {
            return false;
        }

    };

    $scope.toggleAdvancedSearch = function() {
        if ($scope.advancedSearch === true) {
            $scope.advancedSearch = false;
        } else {
            $scope.advancedSearch = true;
        }

    };





    // Intrest button stuff
    // Animal,Education,Environment,People,Recreation,Technology,Youth
    var intrestArray = [];
    var intrestString= '';
    $scope.animalButton = 'background-color: white';
    $scope.educationButton = 'background-color: white';
    $scope.environmentButton = 'background-color: white';
    $scope.peopleButton = 'background-color: white';
    $scope.recreationButton = 'background-color: white';
    $scope.technologyButton = 'background-color: white';
    $scope.youthButton = 'background-color: white';

    $scope.addAnimal = function() {

        if ($scope.animalButton === 'background-color: white') {
            $scope.animalButton = 'background-color: lightgray';
            intrestArray[0] = 'Animal';
            //console.log(intrestArray);
        } else {
            $scope.animalButton = 'background-color: white';
            intrestArray[0] = undefined;
            //console.log(intrestArray);
        }
    };

    $scope.addEducation = function() {
        if ($scope.educationButton === 'background-color: white') {
            $scope.educationButton = 'background-color: lightgray';

            intrestArray[1] = 'Education';
            //console.log(intrestArray);

        } else {
            $scope.educationButton = 'background-color: white';
            intrestArray[1] = undefined;
            //console.log(intrestArray);
        }
    };

    $scope.addEnvironment = function() {
        if ($scope.environmentButton === 'background-color: white') {
            $scope.environmentButton = 'background-color: lightgray';

            intrestArray[2] = 'Environment';
            //console.log(intrestArray);

        } else {
            $scope.environmentButton = 'background-color: white';
            intrestArray[2] = undefined;
            //console.log(intrestArray);
        }
    };

    $scope.addPeople = function() {
        if ($scope.peopleButton === 'background-color: white') {
            $scope.peopleButton = 'background-color: lightgray';

            intrestArray[3] = 'People';
            //console.log(intrestArray);

        } else {
            $scope.peopleButton = 'background-color: white';
            intrestArray[3] = undefined;
            //console.log(intrestArray);
        }
    };

    $scope.addRecreation = function() {
        if ($scope.recreationButton === 'background-color: white') {
            $scope.recreationButton = 'background-color: lightgray';

            intrestArray[4] = 'Recreation';
            //console.log(intrestArray);

        } else {
            $scope.recreationButton = 'background-color: white';
            intrestArray[4] = undefined;
            //console.log(intrestArray);
        }
    };

    $scope.addTechnology = function() {
        if ($scope.technologyButton === 'background-color: white') {
            $scope.technologyButton = 'background-color: lightgray';

            intrestArray[5] = 'Technology';
            //console.log(intrestArray);

        } else {
            $scope.technologyButton = 'background-color: white';
            intrestArray[5] = undefined;
            //console.log(intrestArray);
        }
    };

    $scope.addYouth = function() {

        if ($scope.youthButton === 'background-color: white') {
            $scope.youthButton = 'background-color: lightgray';

            intrestArray[6] = 'Youth';
            //console.log(intrestArray);

        } else {
            $scope.youthButton = 'background-color: white';
            intrestArray[6] = undefined;

        }


    };

});
