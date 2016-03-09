define(["require", "exports", "./app.controller", "../pg-google-search/google-search.controller", "./app.route-provider", "../pg-google-search/google-search.route-provider", "../pg-02/view2"], function (require, exports, app_controller_1, google_search_controller_1, app_route_provider_1, google_search_route_provider_1) {
    var App = (function () {
        function App() {
        }
        App.start = function () {
            var app = angular.module('myApp', [
                'ngRoute',
                'myApp.view2'
            ]);
            app.controller('AppCtrl', app_controller_1.AppController);
            app.config(app_route_provider_1.AppRouteProvider);
            app.controller('GoogleSearchCtrl', google_search_controller_1.GoogleSearchController);
            app.config(google_search_route_provider_1.GoogleSearchRouteProvider);
            angular.element(document).ready(function () {
                angular.bootstrap(document, ['myApp']);
            });
        };
        return App;
    })();
    exports.App = App;
});
//# sourceMappingURL=app.js.map