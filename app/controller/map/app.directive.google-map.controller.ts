import { Map}  from '../map';
import { CalculateRoute} from '../calculate-route';

export class AppGoogleMapDirectiveController
{
	public static $inject = ['$scope', '$attrs', '$element'];
	constructor(private $scope,private $attrs,private $element)
	{
		var map = new Map($element.find('#googleMap')[0]);

		$scope.calculateRoute = function() {
			if (!$scope.route.from || !$scope.route.to)
				return;
			CalculateRoute.calculateRoute($scope.route.from, $scope.route.to, map);
		}

		$scope.$watch(
			function() { return $scope.center },
			function() {
				if ($scope.center === undefined) return;
				map.panTo($scope.center);
			})

		$scope.$watch(
			function() { return $scope.zoom },
			function() {
				if ($scope.zoom === undefined) return;
				map.setZoom(parseInt($scope.zoom));
			})

		$scope.$watch(function() { return $scope.route.to },
			$scope.calculateRoute)

		$scope.$watch(function() { return $scope.route.from },
			$scope.calculateRoute)

	}

}