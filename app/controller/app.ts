import  "../pg-google-search/google-search";
import  "../pg-02/view2";
import {AppController}  from "./app.controller";
import {GoogleSearchController} from "../pg-google-search/google-search.controller";
import {AppRouteProvider} from "./app.route-provider";
import {GoogleSearchRouteProvider} from "../pg-google-search/google-search.route-provider";
	
export class App
{
    public static start()
    {		
        var app = angular.module('myApp', [
			'ngRoute',
			'myApp.view2'
		])
		AppController.register(app);
		AppRouteProvider.register(app);
		GoogleSearchController.register(app);
		GoogleSearchRouteProvider.register(app);

		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});   
    } 
}

