define(["require", "exports", '../controller/map', '../controller/autocomplete', '../controller/calculateroute'], function (require, exports, map_1, autocomplete_1, calculateroute_1) {
    var GoogleSearchController = (function () {
        function GoogleSearchController() {
        }
        GoogleSearchController.register = function (app) {
            var _this = this;
            app.controller('GoogleSearchCtrl', ["$scope", function ($scope) {
                    $scope.from = "";
                    $scope.to = "";
                    _this.map = new map_1.Map(document.getElementById('googleMap'));
                    _this.autocomplete = new autocomplete_1.Autocomplete();
                    _this.autocomplete.addListener('place_changed', function () {
                        var place = _this.autocomplete.getPlace();
                        if (place.geometry) {
                            _this.map.panTo(place.geometry.location);
                            _this.map.setZoom(5);
                            _this.autocomplete.fillInAddress();
                        }
                        else {
                            document.getElementById('autocomplete').placeholder = 'Enter a city';
                        }
                    });
                    $scope.geolocate = function () {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var geolocation;
                                geolocation = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };
                                var circle = new google.maps.Circle({
                                    center: geolocation,
                                    radius: position.coords.accuracy
                                });
                                _this.autocomplete.setBounds(circle.getBounds());
                            });
                        }
                    };
                    $scope.getCurrentPosition = function ($event) {
                        $event.preventDefault();
                        var addressId = $event.target.id.substring(0, $event.target.id.indexOf("-"));
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var geocoder = new google.maps.Geocoder();
                            geocoder.geocode({
                                "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                            }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK)
                                    $scope[addressId] = results[0].formatted_address;
                                $scope.$apply();
                            });
                        }, function (positionError) {
                        }, {
                            enableHighAccuracy: true,
                            timeout: 10 * 1000
                        });
                    };
                    $scope.calculateRoute = function ($event) {
                        $event.preventDefault();
                        calculateroute_1.CalculateRoute.calculateRoute($scope.from, $scope.to, _this.map);
                    };
                }]);
        };
        return GoogleSearchController;
    })();
    exports.GoogleSearchController = GoogleSearchController;
});
//# sourceMappingURL=google-search.controller.js.map