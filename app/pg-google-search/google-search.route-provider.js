define(["require", "exports"], function (require, exports) {
    var GoogleSearchRouteProvider = (function () {
        function GoogleSearchRouteProvider() {
        }
        GoogleSearchRouteProvider.register = function (app) {
            app.config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/google-search', {
                        templateUrl: 'pg-google-search/google-search.html',
                        controller: 'GoogleSearchCtrl'
                    });
                }]);
        };
        return GoogleSearchRouteProvider;
    })();
    exports.GoogleSearchRouteProvider = GoogleSearchRouteProvider;
});
//# sourceMappingURL=google-search.route-provider.js.map