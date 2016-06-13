angular.module('AuthenticateDirective', []).directive('authenticate', function(){

	console.log("This is authenticate directive being part of div");
	return {
		restrict :'EA',
		scope : true,
		controller : 'authenticateController as authctrl',
		bindToController: true
	};

});
