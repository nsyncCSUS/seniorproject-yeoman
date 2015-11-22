'use strict';

angular.module('seniorprojectYoApp')
    .controller('testCtrl', function($http,$scope,SearchService) {

      
      //Example of using SearchService in services/SearchService/ folder
      //eventSerach(searchString,Intrests)
      // SearchString should be sperated with spaces 'Dog Hospital'
      // Intrests should be seperated by spaces Ex 'sports animals youth'
      // This yeilds /api/search/events/date?undefined
      SearchService.eventSearch('date').then(function(data){
        console.log(data.data); // this gives you the serch query results as an array
        console.log(data.data.length); // Legnth of array (note:starts at 1 not zero)
        console.log(data.data[0]);// first result inside array

      });



      //Example using direct server routes from server/api/search/index.js folder
      $http.get('api/search/events/all').then(function(data){
        console.log(data.data[0]);
        $scope.data = data[0];
      });







    });
