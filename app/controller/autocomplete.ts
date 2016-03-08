/// <reference path="../../typings/tsd.d.ts" />
'use strict';

export class Autocomplete{
	autocomplete: google.maps.places.Autocomplete;
	
	constructor(element: any) {
		this.autocomplete = new google.maps.places.Autocomplete(
			(element),
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
    
}
