'use strict';

angular.module('seniorprojectYoApp')
	.directive('groupCard', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/directives/group/groupCard.html'
		};
	}); 

	.directive('groupEventCard', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/directives/group/groupEventCard.html'
		};
	}); 
	
	.directive('pastGroupEventCard', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/directives/group/pastGroupEventCard.html'
		};
	});