define(["require", "exports", '../map', '../calculate-route'], function (require, exports, map_1, calculate_route_1) {
    var AppGoogleMapDirectiveController = (function () {
        function AppGoogleMapDirectiveController($scope, $attrs, $element) {
            this.$scope = $scope;
            this.$attrs = $attrs;
            this.$element = $element;
            var map = new map_1.Map($element.find('#googleMap')[0]);
            $scope.calculateRoute = function () {
                if (!$scope.route.from || !$scope.route.to)
                    return;
                calculate_route_1.CalculateRoute.calculateRoute($scope.route.from, $scope.route.to, map);
            };
            $scope.$watch(function () { return $scope.center; }, function () {
                if ($scope.center === undefined)
                    return;
                map.panTo($scope.center);
            });
            $scope.$watch(function () { return $scope.zoom; }, function () {
                if ($scope.zoom === undefined)
                    return;
                map.setZoom(parseInt($scope.zoom));
            });
            $scope.$watch(function () { return $scope.route.to; }, $scope.calculateRoute);
            $scope.$watch(function () { return $scope.route.from; }, $scope.calculateRoute);
        }
        AppGoogleMapDirectiveController.$inject = ['$scope', '$attrs', '$element'];
        return AppGoogleMapDirectiveController;
    })();
    exports.AppGoogleMapDirectiveController = AppGoogleMapDirectiveController;
});
//# sourceMappingURL=app.directive.google-map.controller.js.map