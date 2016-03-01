/// <reference path="../../typings/tsd.d.ts" />
'use strict';

export class Autocomplete {
	autocomplete: any;
	componentForm: any;
	map: any;

	contructor() {
		this.componentForm = {
			street_number: 'short_name',
			route: 'long_name',
			locality: 'long_name',
			administrative_area_level_1: 'short_name',
			country: 'long_name',
			postal_code: 'short_name'
		};

	}

	initAutocomplete() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		this.autocomplete = new google.maps.places.Autocomplete(
			(<HTMLInputElement>document.getElementById('autocomplete')),
			{ types: ['geocode'] });

		this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
	}

	onPlaceChanged() {
		var place = this.autocomplete.getPlace(); if (place.geometry) {
			this.map.panTo(place.geometry.location);
			this.map.setZoom(5);
			this.fillInAddress();
		} else {
			(<HTMLInputElement>document.getElementById('autocomplete')).placeholder = 'Enter a city';
		}
	}

	fillInAddress() {
		// Get the place details from the autocomplete object.
		var place = this.autocomplete.getPlace();

		for (var component in this.componentForm) {
			(<HTMLInputElement>document.getElementById(component)).value = '';
			(<HTMLInputElement>document.getElementById(component)).disabled = false;
		}

		// Get each component of the address from the place details
		// and fill the corresponding field on the form.
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (this.componentForm[addressType]) {
				var val = place.address_components[i][this.componentForm[addressType]];
				(<HTMLInputElement>document.getElementById(addressType)).value = val;
			}
		}
	}
}

// export = Autocomplete;
