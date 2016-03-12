import  "../pg-02/view2";
import {AppController}  from "./app.controller";
import {GoogleSearchController} from "../pg-google-search/google-search.controller";
import {AppRouteProvider} from "./app.route-provider";
import {GoogleSearchRouteProvider} from "../pg-google-search/google-search.route-provider";
import {AppGoogleMapDirective} from "./map/app.directive.google-map";
import {} from "../pg-02/view2";	
export class App {
    public static start() {
        var app = angular.module('myApp', [
			'ngRoute',
			'myApp.view2'
		]);

		var googleMapDirective = new AppGoogleMapDirective();
		app.controller('AppCtrl', AppController);
		app.config(AppRouteProvider);
		app.controller('GoogleSearchCtrl', GoogleSearchController);
		app.config(GoogleSearchRouteProvider);
		app.directive('googleMap', googleMapDirective.initilizeDirective);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});
    }
}


