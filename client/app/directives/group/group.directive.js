'use strict';

angular.module('seniorprojectYoApp')
	.directive('groupCard', function() {
		return {
			restrict: 'EA',
			templateUrl: 'app/directives/group/groupCard.html',
			controller: 'GroupCardCtrl',
			scope: {
				group: "="
			},
			link: function(scope, element, attrs){

			}
		};
	});
