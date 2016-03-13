'use strict';

describe('myApp.view2 module', function() {

	var $scope;
	beforeEach(module('myApp.view2'));
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();        
	}));

	describe('view2 controller', function(){

		it('should ....', inject(function($controller) {
	  //spec body
	  var view2Ctrl = $controller('View2Ctrl', {
	  	$scope: $scope
	  });
	  expect(view2Ctrl).toBeDefined();
	}));

	});
});