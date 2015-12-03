'use strict';

angular.module('seniorprojectYoApp')
	.directive('eventCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/event/eventCard.html',
			controller: 'EventCardCtrl',
			scope: {
				event: "="
			},
			link: function(scope, element, attrs){

			}
		}
	})

	.directive('pastEventCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/event/pastEventCard.html',
			controller: 'EventCardCtrl',
			scope: {
				event: "="
			},
			link: function(scope, element, attrs){

			}
		}
	})

	.directive('groupEventCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/event/groupEventCard.html',
			controller: 'EventCardCtrl',
			scope: {
				event: "="
			},
			link: function(scope, element, attrs){

			}
		}
	})

	.directive('groupEventSmCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/event/groupEventSmCard.html',
			controller: 'EventCardCtrl',
			scope: {
				event: "="
			},
			link: function(scope, element, attrs){

			}
		}
	})

	.directive('pastGroupEventCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/event/pastGroupEventCard.html',
			controller: 'EventCardCtrl',
			scope: {
				event: "="
			},
			link: function(scope, element, attrs){

			}
		}
	})

	.directive('pastGroupEventSmCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/event/pastGroupEventSmCard.html',
			controller: 'EventCardCtrl',
			scope: {
				event: "="
			},
			link: function(scope, element, attrs){

			}
		}
	});
