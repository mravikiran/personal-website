// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // candidates page that will use the CandidateController
        .when('/candidates', {
            templateUrl: 'views/candidate.html',
            controller: 'CandidateController'
        })
        //setup route for login
        .when('/login', {
            templateUrl : 'views/login.html',
            controller : 'LoginController'
        })
        //signup route
        .when('/signup', {
            templateUrl : 'views/signup.html',
            controller : 'SignupController'
        }).when('/resume', {
            templateUrl : 'views/resume.html',
            controller : 'ResumeController'
        }).when('/createstories', {
            templateUrl : 'views/createstories.html',
            controller : 'StoryController'
        })
        
        ;

    $locationProvider.html5Mode(true);

}])
.run(['$rootScope', '$location', 'authenticationService', function($rootScope, $location, authenticationService){


     $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if (!authenticationService.isLoggedIn()) {
        console.log( "No one is logged in");
        $location.path('/login');
      }
      else
      {
        console.log(authenticationService.currentUser().name + " is logged in");
        
      }
    });




}]);
