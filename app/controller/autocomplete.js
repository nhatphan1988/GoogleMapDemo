define(["require", "exports"], function (require, exports) {
    'use strict';
    var Autocomplete = (function () {
        function Autocomplete(element) {
            this.autocomplete = new google.maps.places.Autocomplete((element), { types: ['geocode'] });
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
        return Autocomplete;
    })();
    exports.Autocomplete = Autocomplete;
});
//# sourceMappingURL=autocomplete.js.map