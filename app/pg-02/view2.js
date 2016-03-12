define(function () {
    // Declare app level module which depends on views, and components
    angular.module('myApp.view2', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/view2', {
	    templateUrl: 'pg-02/view2.html',
	    controller: 'View2Ctrl'
	  });
	}])
	.controller('View2Ctrl', ['$scope',function($scope) {
		$scope.route ={
			from:'332 Hougang Ave 5, Singapore 530332',
			to:'335 Hougang Ave 5, Singapore 530332'
		}
	}]);
});