export class GoogleSearchRouteProvider {
	public static register(app: angular.IModule) {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/google-search', {
				templateUrl: 'pg-google-search/google-search.html',
				controller: 'GoogleSearchCtrl'
			});
		}])
	}
}