import { AppGoogleMapDirectiveController}  from '../map/app.directive.google-map.controller';

export class AppGoogleMapDirective {
	public constructor() {
	}

	public initilizeDirective()
	{
		return {
			restrict: 'E',
			scope: {
				zoom:'=',
				route:'=',
				center:'=',
			},
			templateUrl: './controller/map/google-map.html',
			controller: AppGoogleMapDirectiveController
		};
	}
}