// public/js/controllers/MainCtrl.js
angular.module('SidenavCtrl', []).controller('SidenavController',[ '$scope','$log','$timeout','$mdSidenav','$mdUtil', function($scope,$log, $timeout, $mdSidenav, $mdUtil) {

    $scope.buttonText = 'Google';  
    $scope.isLockedOpen = false;
    $scope.showNgView = false;
    $scope.showDarkTheme = true;
    $scope.showCardContent = false;


$scope.toggleCardContent = function() {
  $scope.showCardContent = !$scope.showCardContent;
}
$scope.toggleNgView = function() {
  $scope.showNgView = !$scope.showNgView;
};


var componentId = 'left';
$scope.toggleLeft = buildDelayedToggler('left');
$scope.open = function() {
  $scope.isLockedOpen = true;
    $mdSidenav('left').open().then(function(){});
};

$scope.close = function() {
    $mdSidenav('left').close().then(function(){$scope.isLockedOpen = false;});
};

$scope.toggle = function(){

  if($scope.isLockedOpen)
    this.close();
  else
    this.open();

};
$scope.toggleInstant = function(){
  $scope.isLockedOpen = !$scope.isLockedOpen;
  $mdSidenav('left')
          .toggle()
          .then(function () {
            $log.debug("toggle left is done");
          });

};
/**
* Supplies a function that will continue to operate until the
     * time is up.
     */
function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
}

function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        	$mdSidenav(navID)
          .toggle()
          .then(function () {
          	$scope.isLockedOpen = !$scope.isLockedOpen
            $log.debug("toggle " + navID + " is done");
          });

      }, 300);
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */

    // Async lookup for sidenav instance; will resolve when the instance is available
$mdSidenav(componentId).then(function(instance) {
  $log.debug( componentId + "is now ready" );

});
// Async toggle the given sidenav;
// when instance is known ready and lazy lookup is not needed.

}]);
