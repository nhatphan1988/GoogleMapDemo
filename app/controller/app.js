define(["require", "exports", "./app.controller", "../pg-google-search/google-search.controller", "./app.route-provider", "../pg-google-search/google-search.route-provider", "../pg-google-search/google-search", "../pg-02/view2"], function (require, exports, app_controller_1, google_search_controller_1, app_route_provider_1, google_search_route_provider_1) {
    var App = (function () {
        function App() {
        }
        App.start = function () {
            var app = angular.module('myApp', [
                'ngRoute',
                'myApp.view2'
            ]);
            app_controller_1.AppController.register(app);
            app_route_provider_1.AppRouteProvider.register(app);
            google_search_controller_1.GoogleSearchController.register(app);
            google_search_route_provider_1.GoogleSearchRouteProvider.register(app);
            angular.element(document).ready(function () {
                angular.bootstrap(document, ['myApp']);
            });
        };
        return App;
    })();
    exports.App = App;
});
//# sourceMappingURL=app.js.map