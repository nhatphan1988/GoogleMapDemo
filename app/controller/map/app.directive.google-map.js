define(["require", "exports", '../map/app.directive.google-map.controller'], function (require, exports, app_directive_google_map_controller_1) {
    var AppGoogleMapDirective = (function () {
        function AppGoogleMapDirective() {
        }
        AppGoogleMapDirective.prototype.initilizeDirective = function () {
            return {
                restrict: 'E',
                scope: {
                    zoom: '=',
                    route: '=',
                    center: '=',
                },
                templateUrl: './controller/map/google-map.html',
                controller: app_directive_google_map_controller_1.AppGoogleMapDirectiveController
            };
        };
        return AppGoogleMapDirective;
    })();
    exports.AppGoogleMapDirective = AppGoogleMapDirective;
});
//# sourceMappingURL=app.directive.google-map.js.map