define(["require", "exports"], function (require, exports) {
    var AppRouteProvider = (function () {
        function AppRouteProvider() {
        }
        AppRouteProvider.register = function (app) {
            app.config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.otherwise({ redirectTo: '/google-search' });
                }]);
        };
        return AppRouteProvider;
    })();
    exports.AppRouteProvider = AppRouteProvider;
});
//# sourceMappingURL=app.route-provider.js.map