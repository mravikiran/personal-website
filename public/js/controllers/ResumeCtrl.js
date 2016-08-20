// public/js/controllers/CandidateCtrl.js
angular.module('ResumeCtrl', []).controller('ResumeController',['$scope', '$routeParams','resumeService',function($scope, $routeParams, resumeService) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    var candidateName = $routeParams.name;
    console.log("Candidates NAme is :" + candidateName);

    resumeService.get(candidateName).then(
                            function(res){
                            	$scope.ResumeData  = res.data[0]; // use logic later to get the data
                            	console.log("Inside Resume service Getting response from the server ");
                            	console.log($scope.ResumeData.education[0]);
                            }
        );

}]);
	