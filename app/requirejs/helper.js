'use strict';
define(function () {
    var Helper = (function () {
        function Helper() {
            this.componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
        }
        Helper.prototype.RegisterCalculateRouteEvent = function () {
            var _this = this;
            if (this.isGeolocationError()) {
                $("#error").text("Your browser doesn't support the Geolocation API");
                return;
            }
            $("#from-link, #to-link").click(function (event) {
                event.preventDefault();
                var addressId = this.id.substring(0, this.id.indexOf("-"));
                navigator.geolocation.getCurrentPosition(function (position) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK)
                            $("#" + addressId).val(results[0].formatted_address);
                        else
                            $("#error").append("Unable to retrieve your address<br />");
                    });
                }, function (positionError) {
                    $("#error").append("Error: " + positionError.message + "<br />");
                }, {
                    enableHighAccuracy: true,
                    timeout: 10 * 1000
                });
            });
            $("#calculate-route").submit(function (event) {
                event.preventDefault();
                _this.calculateRoute($("#from").val(), $("#to").val());
            });
            $("#test-form").submit(function (event) {
                event.preventDefault();
                $.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDjjkgkGLrrIHPBnHgtYB29fJZNqC5bmlM", function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                });
            });
        };
        Helper.prototype.calculateRoute = function (from, to) {
            var _this = this;
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
                        map: _this.map,
                        directions: response
                    });
                }
                else
                    $("#error").append("Unable to retrieve your route<br />");
            });
        };
        Helper.prototype.isGeolocationError = function () {
            return typeof navigator.geolocation == "undefined";
        };
        Helper.prototype.initMap = function () {
            var pyrmont = { lat: -33.867, lng: 151.195 };
            var mapProp = {
                center: pyrmont,
                zoom: 15,
            };
            this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            this.infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch({
                location: pyrmont,
                radius: 500,
                types: ['store']
            }, this.callback.bind(this));
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                center: this.map.center,
                radius: 500,
            });
        };
        Helper.prototype.callback = function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    this.createMarker(results[i]);
                }
            }
        };
        Helper.prototype.createMarker = function (place) {
            var placeLoc = place.geometry.location;
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            var marker = new google.maps.Marker({
                icon: image,
                map: this.map,
                title: place.name,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function () {
                this.infowindow.setContent(place.name);
                this.infowindow.open(this.map, this);
            });
        };
        Helper.prototype.initAutocomplete = function () {
            this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
            this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
        };
        Helper.prototype.onPlaceChanged = function () {
            var place = this.autocomplete.getPlace();
            if (place.geometry) {
                this.map.panTo(place.geometry.location);
                this.map.setZoom(5);
                this.fillInAddress();
            }
            else {
                document.getElementById('autocomplete').placeholder = 'Enter a city';
            }
        };
        Helper.prototype.fillInAddress = function () {
            var place = this.autocomplete.getPlace();
            for (var component in this.componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (this.componentForm[addressType]) {
                    var val = place.address_components[i][this.componentForm[addressType]];
                    document.getElementById(addressType).value = val;
                }
            }
        };
        return Helper;
    })();
    return Helper;
});
//# sourceMappingURL=helper.js.map