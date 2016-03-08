define(["require", "exports"], function (require, exports) {
    'use strict';
    var Autocomplete = (function () {
        function Autocomplete() {
            this.componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
            this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
        }
        Autocomplete.prototype.addListener = function (eventName, handler) {
            return this.autocomplete.addListener(eventName, handler);
        };
        Autocomplete.prototype.getPlace = function () {
            return this.autocomplete.getPlace();
        };
        Autocomplete.prototype.setBounds = function (latLngBound) {
            this.autocomplete.setBounds(latLngBound);
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
//# sourceMappingURL=autocomplete.js.map