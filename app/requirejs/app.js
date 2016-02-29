'use strict';

define(['angularAMD','view1','view2','angular-route'], function (angularAMD) {
    // Declare app level module which depends on views, and components
	var app=angular.module('myApp', [
		'ngRoute',
		'myApp.view1',
		'myApp.view2'
		]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);

    return angularAMD.bootstrap(app);
});
