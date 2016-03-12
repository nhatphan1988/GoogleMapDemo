/// <reference path="../../typings/tsd.d.ts" />

import { Map}  from '../controller/map';
import { Autocomplete }  from '../controller/autocomplete';
import { CalculateRoute} from '../controller/calculate-route';

export class GoogleSearchController {

	public static $inject = ["$scope"];
	map: Map;
	autocomplete: Autocomplete;
	componentForm = {
		street_number: 'short_name',
		route: 'long_name',
		locality: 'long_name',
		administrative_area_level_1: 'short_name',
		country: 'long_name',
		postal_code: 'short_name'
	};

	constructor(private $scope) {
		$scope.route = {
			from: '',
			to: ''
		};
		// this.map = new Map(<HTMLInputElement>document.getElementById('googleMap'));
		this.autocomplete = new Autocomplete(<HTMLInputElement>document.getElementById('autocomplete'));

		this.autocomplete.addListener('place_changed', this.handlePlaceChanged.bind(this));

		$scope.geolocate = this.locateGeo.bind(this);

		$scope.getCurrentPosition = this.getCurrentPosition.bind(this);

		// $scope.calculateRoute = ($event) => {
		// 	$event.preventDefault();
		// 	CalculateRoute.calculateRoute($scope.from, $scope.to, this.map);

		// }
	}

	private handlePlaceChanged() {
		var place = this.autocomplete.getPlace();
		if (place.geometry) {
			// this.map.panTo(place.geometry.location);
			//this.map.setZoom(5);
			this.$scope.center = place.geometry.location;
			this.$scope.zoom = '15';
			this.$scope.$apply();
			this.fillInAddress.bind(this)();
		} else {
			(<HTMLInputElement>document.getElementById('autocomplete')).placeholder = 'Enter a city';
		}
	}

	private locateGeo() {
		if (!navigator.geolocation) {
			return;
		}

		navigator.geolocation.getCurrentPosition((position) => {
			var geolocation: any;
			geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			this.autocomplete.setBounds(circle.getBounds());
		});
	}

	private handlePositionFound(position, addressId) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude) },
			(results, status) => {
				if (status == google.maps.GeocoderStatus.OK) {
					this.$scope.route[addressId] = results[0].formatted_address;
					this.$scope.$apply();
				}
			});

	}

	private getCurrentPosition($event) {
		$event.preventDefault();
		var addressId = $event.target.id.substring(0, $event.target.id.indexOf("-"));

		navigator.geolocation.getCurrentPosition(position => {
			this.handlePositionFound(position, addressId);
		},
			(positionError) => {

			},
			{
				enableHighAccuracy: true,
				timeout: 10 * 1000 // 10 seconds
			});
	}


	private fillInAddress() {
		// Get the place details from the autocomplete object.
		var place = this.autocomplete.getPlace();

		for (var component in this.componentForm) {
			(<HTMLInputElement>document.getElementById(component)).value = '';
			(<HTMLInputElement>document.getElementById(component)).disabled = false;
		}

		// Get each component of the address from the place details
		// and fill the corresponding field on the form.
		this.fillAddressResultToView(place);
	}

	private fillAddressResultToView(place) {
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (this.componentForm[addressType]) {
				var val = place.address_components[i][this.componentForm[addressType]];
				(<HTMLInputElement>document.getElementById(addressType)).value = val;
			}
		}
	}
}


