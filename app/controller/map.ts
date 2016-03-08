/// <reference path="../../typings/tsd.d.ts" />
'use strict';

export class Map {    
	private map: google.maps.Map;
	infowindow: any;
	componentForm: any;

	get Map()
	{
		return this.map;
	}

	constructor(element:any) {
		var pyrmont: any = { lat: -33.867, lng: 151.195 };

		var mapProp = {
			center: pyrmont,
			zoom: 15,
		};

		// this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

		this.map = new google.maps.Map(element, mapProp);

		this.infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService(this.map);
		service.nearbySearch({
			location: pyrmont,
			radius: 500,
			types: ['store']
		}, this.callback.bind(this));
	}
    
	callback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				this.createMarker(results[i]);
			}
		}
	}

	createMarker(place) {
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

		google.maps.event.addListener(marker, 'click', function() {
			this.infowindow.setContent(place.name);
			this.infowindow.open(this.map, this);
		});
	}

	panTo(latLng:google.maps.LatLng)
	{
		this.map.panTo(latLng)
	}

	setZoom(zoom:number)
	{
		this.map.setZoom(zoom);
	}

	 //    private initMap() {


	// 	// var cityCircle = new google.maps.Circle({
	// 	// 	strokeColor: '#FF0000',
	// 	// 	strokeOpacity: 0.8,
	// 	// 	strokeWeight: 2,
	// 	// 	fillColor: '#FF0000',
	// 	// 	fillOpacity: 0.35,
	// 	// 	map: this.map,
	// 	// 	center: this.map.center,
	// 	// 	radius: 500,
	// 	// });
	// }

}

