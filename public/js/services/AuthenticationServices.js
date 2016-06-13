angular.module('AuthenticationServices',[]).service('authenticationService', ['$http','$window', function($http, $window){


var saveToken = function(token) {

    $window.localStorage['mean-token'] = token;

};

var getToken = function() {
    return $window.localStorage['mean-token'];
};

var logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

var isLoggedIn = function() {
  var token = getToken();
  var payload;

  if(token){
    payload = token.split('.')[1];
    payload = $window.atob(payload);
    payload = JSON.parse(payload);

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

var currentUser = function() {
  if(isLoggedIn()){
    var token = getToken();
    var payload = token.split('.')[1];
    payload = $window.atob(payload);
    payload = JSON.parse(payload);
    return {
      email : payload.email,
      name : payload.name
    };
  }
};

var signup = function(user) {
  return $http.post('/api/signup', user);
};

var login = function(user) {
  return $http.post('/api/login', user);
};


return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      login : login,
      currentUser : currentUser, 
      isLoggedIn : isLoggedIn,
      signup : signup
    };

}]);
