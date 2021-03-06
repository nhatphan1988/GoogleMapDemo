/// <reference path="../../typings/tsd.d.ts" />

import { Map}  from '../controller/map';

export class CalculateRoute
{
	public static calculateRoute(from, to, map:Map) {
		var directionsService = new google.maps.DirectionsService();
		var directionsRequest = {
			origin: from,
			destination: to,
			unitSystem: google.maps.UnitSystem.METRIC,
			travelMode: google.maps.TravelMode["DRIVING"]
		};
		directionsService.route(
			directionsRequest,
			(response, status)=>{
				map.renderDirections(response, status);
			}
		);
	}
}