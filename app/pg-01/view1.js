define(['angularAMD',"helper"], function (angularAMD,Helper){
	
	angular.module('myApp.view1', ['ngRoute','ngResource'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {
			templateUrl: 'pg-01/view1.html',
			controller: 'View1Ctrl'
		});
	}])
	.factory('$userResource',['$resource',function($resource){
		return $resource('http://localhost:42217/api/Users/:id',null,
		{
		});
	}])
	.controller('View1Ctrl', ["$scope",'$userResource',function($scope,$userResource){

		var helper = new Helper();
		helper.initMap();
		helper.initAutocomplete();

		var user = $userResource.query({}, function(data) {
			$scope.users = data;
			console.log("success.");
		});

		$scope.geolocate = function geolocate() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var geolocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					autocomplete.setBounds(circle.getBounds());
				});
			}
		};

		helper.RegisterCalculateRouteEvent();
	}]);
});