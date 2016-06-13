angular.module('AuthenticateCtrl', []).controller('authenticateController',['authenticationService', function(authenticationService){
 this.isLoggedIn = authenticationService.isLoggedIn();
 this.currentUser = authenticationService.currentUser();
console.log("Current user is " + this.currentUser.name + " and he is " + (this.isLoggedIn? "true" : "false"));

}]);
