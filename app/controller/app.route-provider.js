define(["require", "exports"], function (require, exports) {
    var AppRouteProvider = (function () {
        function AppRouteProvider($routeProvider) {
            $routeProvider.otherwise({ redirectTo: '/google-search' });
        }
        AppRouteProvider.$inject = ["$routeProvider"];
        return AppRouteProvider;
    })();
    exports.AppRouteProvider = AppRouteProvider;
});
//# sourceMappingURL=app.route-provider.js.map