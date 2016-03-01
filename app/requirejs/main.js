'use strict';

requirejs.config(
	{
		paths:{
			'angular': '../bower_components/angular/angular',
        	'angularAMD': '../bower_components/angularAMD/angularAMD',
        	'google-search':'../pg-google-search/google-search',
        	'helper':'helper',
        	'view2':'../pg-02/view2'
		},
    	
    	deps: ['app','app.register']

	}
)

require([],
	function(){
	}
)