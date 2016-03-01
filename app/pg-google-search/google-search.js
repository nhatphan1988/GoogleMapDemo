define(["require", "exports", '../requirejs/Helper'], function (require, exports, Helper_1) {
    var helper;
    angular.module('myApp.google-search', ['ngRoute', 'ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/google-search', {
                templateUrl: 'pg-google-search/google-search.html',
                controller: 'GoogleSearchCtrl'
            });
        }])
        .factory('$userResource', ['$resource', function ($resource) {
            return $resource('http://localhost:42217/api/Users/:id', null, {});
        }])
        .controller('GoogleSearchCtrl', ["$scope", '$userResource', function ($scope, $userResource) {
            var helper = new Helper_1.Helper();
            helper.initMap();
            helper.initAutocomplete();
            var user = $userResource.query({}, function (data) {
                $scope.users = data;
                console.log("success.");
            });
            $scope.geolocate = function geolocate() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var geolocation;
                        geolocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        var circle = new google.maps.Circle({
                            center: geolocation,
                            radius: position.coords.accuracy
                        });
                        helper.autocomplete.setBounds(circle.getBounds());
                    });
                }
            };
            helper.RegisterCalculateRouteEvent();
        }]);
});
//# sourceMappingURL=google-search.js.map