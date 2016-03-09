export class AppRouteProvider {
	public static $inject = ["$routeProvider"];
	public constructor($routeProvider) {	
		$routeProvider.otherwise({ redirectTo: '/google-search' });
	}
}