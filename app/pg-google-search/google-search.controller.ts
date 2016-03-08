/// <reference path="../../typings/tsd.d.ts" />

import { Map}  from '../controller/map';
import { Autocomplete }  from '../controller/autocomplete';
import { CalculateRoute} from '../controller/calculateroute';

export class GoogleSearchController {
	static map: Map;
	static autocomplete: Autocomplete;

	public static register(app: angular.IModule) {
		
		app.controller('GoogleSearchCtrl', ["$scope", ($scope) => {

			$scope.from = "";
			$scope.to = "";

			this.map = new Map(<HTMLInputElement>document.getElementById('googleMap'));
			this.autocomplete = new Autocomplete();
			this.autocomplete.addListener('place_changed', () => {
				var place = this.autocomplete.getPlace();
				if (place.geometry) {
					this.map.panTo(place.geometry.location);
					this.map.setZoom(5);
					this.autocomplete.fillInAddress();
				} else {
					(<HTMLInputElement>document.getElementById('autocomplete')).placeholder = 'Enter a city';
				}
			});

			$scope.geolocate = () => {
				if (navigator.geolocation) {
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
			};

			$scope.getCurrentPosition = function($event) {
				$event.preventDefault();
				var addressId = $event.target.id.substring(0, $event.target.id.indexOf("-"));

				navigator.geolocation.getCurrentPosition(
					function(position) {
						var geocoder = new google.maps.Geocoder();
						geocoder.geocode(
							{
								"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
							},
							function(results, status) {
								if (status == google.maps.GeocoderStatus.OK)
									$scope[addressId] = results[0].formatted_address;
								$scope.$apply();
								// else
								// 	$("#error").append("Unable to retrieve your address<br />");
							});
					},
					function(positionError) {
						// $("#error").append("Error: " + positionError.message + "<br />");
					},
					{
						enableHighAccuracy: true,
						timeout: 10 * 1000 // 10 seconds
					});
			}

			$scope.calculateRoute = ($event) => {
				$event.preventDefault();
				CalculateRoute.calculateRoute($scope.from, $scope.to, this.map);

			}

			// var user = $userResource.query({}, function(data) {
			// 	$scope.users = data;
			// 	console.log("success.");
			// });
		}]);
	}


}

