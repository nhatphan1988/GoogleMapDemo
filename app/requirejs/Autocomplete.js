define(["require", "exports"], function (require, exports) {
    'use strict';
    var Autocomplete = (function () {
        function Autocomplete() {
        }
        Autocomplete.prototype.contructor = function () {
            this.componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
        };
        Autocomplete.prototype.initAutocomplete = function () {
            this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
            this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
        };
        Autocomplete.prototype.onPlaceChanged = function () {
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
        Autocomplete.prototype.fillInAddress = function () {
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
        return Autocomplete;
    })();
    exports.Autocomplete = Autocomplete;
});
//# sourceMappingURL=Autocomplete.js.map