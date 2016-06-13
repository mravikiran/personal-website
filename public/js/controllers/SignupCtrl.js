// public/js/controllers/LoginCtrl.js

angular.module('SignupCtrl', []).controller('SignupController',function($scope, $location, authenticationService) {


    $scope.credentials = {
        name : "",
        email : "",
        password : ""
    };

    $scope.signup = function() {
        authenticationService
        .signup($scope.credentials)
        .then(function(data){
        $location.path('/');
        },
        function(error){
         console.log(JSON.stringify(error));
         $location.path('/signup');
        }
        );

    };
    

});
