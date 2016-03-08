define(["require", "exports"], function (require, exports) {
    var CalculateRoute = (function () {
        function CalculateRoute() {
        }
        CalculateRoute.calculateRoute = function (from, to, map) {
            var directionsService = new google.maps.DirectionsService();
            var directionsRequest = {
                origin: from,
                destination: to,
                unitSystem: google.maps.UnitSystem.METRIC,
                travelMode: google.maps.TravelMode["DRIVING"]
            };
            directionsService.route(directionsRequest, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    new google.maps.DirectionsRenderer({
                        map: map.Map,
                        directions: response
                    });
                }
            });
        };
        return CalculateRoute;
    })();
    exports.CalculateRoute = CalculateRoute;
});
//# sourceMappingURL=calculateroute.js.map