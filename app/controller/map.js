define(["require", "exports"], function (require, exports) {
    'use strict';
    var Map = (function () {
        function Map(element) {
            var pyrmont = { lat: -33.867, lng: 151.195 };
            var mapProp = {
                center: pyrmont,
                zoom: 15,
            };
            this.map = new google.maps.Map(element, mapProp);
            this.infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch({
                location: pyrmont,
                radius: 500,
                types: ['store']
            }, this.createMarkers.bind(this));
        }
        Map.prototype.createMarkers = function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    this.createMarker(results[i]);
                }
            }
        };
        Object.defineProperty(Map.prototype, "Map", {
            get: function () {
                return this.map;
            },
            enumerable: true,
            configurable: true
        });
        Map.prototype.createMarker = function (place) {
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
        Map.prototype.panTo = function (latLng) {
            this.map.panTo(latLng);
        };
        Map.prototype.setZoom = function (zoom) {
            this.map.setZoom(zoom);
        };
        return Map;
    })();
    exports.Map = Map;
});
//# sourceMappingURL=map.js.map