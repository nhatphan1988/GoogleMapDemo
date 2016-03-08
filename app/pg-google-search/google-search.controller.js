define(["require", "exports", '../controller/map', '../controller/autocomplete', '../controller/calculateroute'], function (require, exports, map_1, autocomplete_1, calculateroute_1) {
    var GoogleSearchController = (function () {
        function GoogleSearchController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
            $scope.from = "";
            $scope.to = "";
            this.map = new map_1.Map(document.getElementById('googleMap'));
            this.autocomplete = new autocomplete_1.Autocomplete(document.getElementById('autocomplete'));
            this.autocomplete.addListener('place_changed', this.handlePlaceChanged.bind(this));
            $scope.geolocate = this.locateGeo.bind(this);
            $scope.getCurrentPosition = this.getCurrentPosition.bind(this);
            $scope.calculateRoute = function ($event) {
                $event.preventDefault();
                calculateroute_1.CalculateRoute.calculateRoute($scope.from, $scope.to, _this.map);
            };
        }
        GoogleSearchController.prototype.handlePlaceChanged = function () {
            var place = this.autocomplete.getPlace();
            if (place.geometry) {
                this.map.panTo(place.geometry.location);
                this.map.setZoom(5);
                this.fillInAddress.bind(this)();
            }
            else {
                document.getElementById('autocomplete').placeholder = 'Enter a city';
            }
        };
        GoogleSearchController.prototype.locateGeo = function () {
            var _this = this;
            if (!navigator.geolocation) {
                return;
            }
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
        };
        GoogleSearchController.prototype.handlePositionFound = function (position, addressId) {
            var _this = this;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude) }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    _this.$scope[addressId] = results[0].formatted_address;
                    _this.$scope.$apply();
                }
            });
        };
        GoogleSearchController.prototype.getCurrentPosition = function ($event) {
            var _this = this;
            $event.preventDefault();
            var addressId = $event.target.id.substring(0, $event.target.id.indexOf("-"));
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.handlePositionFound(position, addressId);
            }, function (positionError) {
            }, {
                enableHighAccuracy: true,
                timeout: 10 * 1000
            });
        };
        GoogleSearchController.prototype.fillInAddress = function () {
            var place = this.autocomplete.getPlace();
            for (var component in this.componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }
            this.fillAddressResultToView(place);
        };
        GoogleSearchController.prototype.fillAddressResultToView = function (place) {
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (this.componentForm[addressType]) {
                    var val = place.address_components[i][this.componentForm[addressType]];
                    document.getElementById(addressType).value = val;
                }
            }
        };
        GoogleSearchController.$inject = ["$scope"];
        return GoogleSearchController;
    })();
    exports.GoogleSearchController = GoogleSearchController;
});
//# sourceMappingURL=google-search.controller.js.map