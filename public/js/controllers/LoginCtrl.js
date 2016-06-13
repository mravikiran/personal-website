// public/js/controllers/LoginCtrl.js

angular
.module('LoginCtrl', [])
.controller('LoginController',
    function($scope,$location, authenticationService) {


    $scope.credentials = {
        name : "",
        email : "",
        password : ""
    };

    $scope.loginMessage = "";

    $scope.login = function() {
        authenticationService
        .login($scope.credentials)
        .then(function(response){
            authenticationService.saveToken(response.data.token);
            $location.path('/candidates');
        }, function(error){
            console.log(JSON.stringify(error));
            $scope.credentials.name = "";
            $scope.credentials.email = "";
            $scope.credentials.password = "";
            $scope.loginMessage = error.loginMessage;
            console.log(error.loginMessage);
            $location.path('/login');
            
        });

    };
    

});
