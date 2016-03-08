export class AppRouteProvider {
	public static register(app: angular.IModule) {
		app.config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({ redirectTo: '/google-search' });
		}])
	}
}