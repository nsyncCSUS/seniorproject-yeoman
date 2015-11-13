'use strict';

angular.module('seniorprojectYoApp')
	.directive('eventCard', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/directives/event/eventCard.html'
		};
	}); 
	
	.directive('pastEventCard', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/directives/event/pastEventCard.html'
		};
	}); 
	