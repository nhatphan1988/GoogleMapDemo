define(["require", "exports"], function (require, exports) {
    var AppController = (function () {
        function AppController() {
        }
        AppController.register = function (app) {
            app.controller("myController", function () {
            });
        };
        return AppController;
    })();
    exports.AppController = AppController;
});
//# sourceMappingURL=app.controller.js.map