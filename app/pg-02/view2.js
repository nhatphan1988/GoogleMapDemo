define(['angularAMD'], function (angularAMD) {
    // Declare app level module which depends on views, and components
    angular.module('myApp.view2', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/view2', {
	    templateUrl: 'pg-02/view2.html',
	    controller: 'View2Ctrl'
	  });
	}])
	.controller('View2Ctrl', [function() {
	}]);
});