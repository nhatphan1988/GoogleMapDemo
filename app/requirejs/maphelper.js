define(function(){
	var autocomplete,map,infowindow;
	var componentForm = {
			street_number: 'short_name',
			route: 'long_name',
			locality: 'long_name',
			administrative_area_level_1: 'short_name',
			country: 'long_name',
			postal_code: 'short_name'
		};
		
	function RegisterCalculateRouteEvent()
	{
		function isGeolocationError()
		{
			return typeof navigator.geolocation == "undefined";
		}

		if(isGeolocationError())
		{
			$("#error").text("Your browser doesn't support the Geolocation API");
			return;
		}

		$("#from-link, #to-link").click(
			function(event) {
				event.preventDefault();
				var addressId = this.id.substring(0, this.id.indexOf("-"));

				navigator.geolocation.getCurrentPosition(
					function(position) {
						var geocoder = new google.maps.Geocoder();
						geocoder.geocode(
						{
							"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
						},
						function(results, status) {
							if (status == google.maps.GeocoderStatus.OK)
								$("#" + addressId).val(results[0].formatted_address);
							else
								$("#error").append("Unable to retrieve your address<br />");
						});
					},
					function(positionError){
						$("#error").append("Error: " + positionError.message + "<br />");
					},
					{
						enableHighAccuracy: true,
		            timeout: 10 * 1000 // 10 seconds
		        });
			});

		$("#calculate-route").submit(function(event) {
			event.preventDefault();
			calculateRoute($("#from").val(), $("#to").val());
		});

		$("#test-form").submit(function(event) {
			event.preventDefault();
			$.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDjjkgkGLrrIHPBnHgtYB29fJZNqC5bmlM", function(data, status){
    		alert("Data: " + data + "\nStatus: " + status);
		    });
		});

	}

	function calculateRoute(from, to) {
		var directionsService = new google.maps.DirectionsService();
		var directionsRequest = {
			origin: from,
			destination: to,
			travelMode: google.maps.DirectionsTravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC
		};
		directionsService.route(
			directionsRequest,
			function(response, status)
			{
				if (status == google.maps.DirectionsStatus.OK)
				{
					new google.maps.DirectionsRenderer({
						map: map,
						directions: response
					});
				}
				else
					$("#error").append("Unable to retrieve your route<br />");
			}
			);
	}

	function initMap()
	{
		var pyrmont = {lat: -33.867, lng: 151.195};
		var mapProp = {
			center:pyrmont,
			zoom:15,
		};

		map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

		infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
			location: pyrmont,
			radius: 500,
			type: ['store']
		}, callback);

	    var cityCircle = new google.maps.Circle({
	    	strokeColor: '#FF0000',
	    	strokeOpacity: 0.8,
	    	strokeWeight: 2,
	    	fillColor: '#FF0000',
	    	fillOpacity: 0.35,
	    	map: map,
	    	center: map.center,
	    	radius: 500,
	    });
		
		return map;
	}

	function callback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
		}
	}

	function createMarker(place) {
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
			map: map,
			title: place.name,
			position: place.geometry.location
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
	}

	function onPlaceChanged()
	{
		var place = autocomplete.getPlace(); if (place.geometry) {map.panTo(place.geometry.location);
			map.setZoom(5);
			fillInAddress();
		} else {
			document.getElementById('autocomplete').placeholder = 'Enter a city';
		}
	}

	function initAutocomplete()
	{
        // Create the autocomplete object, restricting the search to geographical
        // location types.
         autocomplete = new google.maps.places.Autocomplete(
        	document.getElementById('autocomplete'),
        	{ types: ['geocode']} );

        autocomplete.addListener('place_changed', onPlaceChanged);
		
           // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        
        return autocomplete;
    }

     function fillInAddress() {
		    // Get the place details from the autocomplete object.
	    var place = autocomplete.getPlace();

	    for (var component in componentForm) {
	    	document.getElementById(component).value = '';
	    	document.getElementById(component).disabled = false;
	    }

	    // Get each component of the address from the place details
	    // and fill the corresponding field on the form.
	    for (var i = 0; i < place.address_components.length; i++) {
	    	var addressType = place.address_components[i].types[0];
	    	if (componentForm[addressType]) {
	    		var val = place.address_components[i][componentForm[addressType]];
	    		document.getElementById(addressType).value = val;
	    	}
	    }
	}

    return {
    	initMap: initMap,
    	initAutocomplete:initAutocomplete,
    	RegisterCalculateRouteEvent:RegisterCalculateRouteEvent,
    }

})