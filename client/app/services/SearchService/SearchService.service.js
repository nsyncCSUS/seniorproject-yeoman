'use strict';

angular.module('seniorprojectYoApp')
    .service('SearchService', function($http) {

      // Searches though events name/description/interests
      // with endate > currentdate & maxVolunteers > currentVolunteers
      // Ordered by currentVolunteers & limited to 100 items
      //params
      //searchString : String (seperated by spaces)
      // Example  searchString = "animals youth hospital cars"
      // Note:searchString can be set to all to search all the events
      // intrests : String (seperated by spaces)
      this.eventSearch = function(searchString,interests ){
        return $http.get('/api/search/events/'+searchString+'?'+interests);
      };

      //Search matches the username
      this.userSearch = function(username){
        return $http.get('/api/search/users/'+username);
      };

      //Searches though groups name/description/interests (same as event)
      this.groupSearch = function(searchString,interests){
        return $http.get('/api/search/groups/'+searchString+'?'+interests);
      };


});
