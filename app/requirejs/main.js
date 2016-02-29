'use strict';

requirejs.config(
	{
		paths:{
        	'angularAMD': '../bower_components/angularAMD/angularAMD',
        	'view1':'../pg-01/view1',
        	'view2':'../pg-02/view2'
		},
    	
    	deps: ['app','app.register']

	}
)

require([],
	function(){

	}


)