export class GoogleSearchRouteProvider {
	public static $inject = ["$routeProvider"];
	public constructor($routeProvider) {		
		$routeProvider.when('/google-search', {
			templateUrl: 'pg-google-search/google-search.html',
			controller: 'GoogleSearchCtrl'
		});
	}
}