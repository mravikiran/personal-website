// public/js/app.js
angular
.module('sampleApp', ['ngAnimate', 
								'ngMaterial', 
								'ui.bootstrap',
								'ngRoute', 
								'appRoutes', 
								'MainCtrl', 
								'CandidateCtrl',
								'LoginCtrl',
								'SignupCtrl',
								'SidenavCtrl',
								'AuthenticateCtrl',
								'ResumeCtrl',
								'StoryCtrl',
								'AuthenticateDirective',
								'AuthenticationServices',
								'ResumeServices',
								'CandidateServices',
								'StoryServices'])

.config(function($mdThemingProvider){
				$mdThemingProvider.theme('default')
				.primaryPalette('indigo')
				.accentPalette('yellow')
				.warnPalette('purple')
				.backgroundPalette('grey');
});

