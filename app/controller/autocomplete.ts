/// <reference path="../../typings/tsd.d.ts" />
'use strict';

export class Autocomplete{
	autocomplete: google.maps.places.Autocomplete;
	componentForm: any;
    infowindow: any;
    onPlaceChanged: Function;

	constructor() {
		this.componentForm = {
			street_number: 'short_name',
			route: 'long_name',
			locality: 'long_name',
			administrative_area_level_1: 'short_name',
			country: 'long_name',
			postal_code: 'short_name'
		};

		this.autocomplete = new google.maps.places.Autocomplete(
			(<HTMLInputElement>document.getElementById('autocomplete')),
			{ types: ['geocode'] });	
	}

	addListener(eventName: string, handler: (...args: any[]) => void): google.maps.MapsEventListener
	{
		return this.autocomplete.addListener(eventName, handler);
	}

    
    getPlace()
    {
		return this.autocomplete.getPlace();
    }

    setBounds(latLngBound:google.maps.LatLngBounds)
    {
        this.autocomplete.setBounds(latLngBound);
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
