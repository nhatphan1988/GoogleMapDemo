'use strict';

define(['angularAMD','google-search','view2'], function (angularAMD) {

	var app=angular.module('myApp', [
		'ngRoute',
		'myApp.google-search',
		'myApp.view2'
		]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/google-search'});
	}]);

    return angularAMD.bootstrap(app);
});
