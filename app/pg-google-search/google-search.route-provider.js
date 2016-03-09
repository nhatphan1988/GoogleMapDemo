define(["require", "exports"], function (require, exports) {
    var GoogleSearchRouteProvider = (function () {
        function GoogleSearchRouteProvider($routeProvider) {
            $routeProvider.when('/google-search', {
                templateUrl: 'pg-google-search/google-search.html',
                controller: 'GoogleSearchCtrl'
            });
        }
        GoogleSearchRouteProvider.$inject = ["$routeProvider"];
        return GoogleSearchRouteProvider;
    })();
    exports.GoogleSearchRouteProvider = GoogleSearchRouteProvider;
});
//# sourceMappingURL=google-search.route-provider.js.map