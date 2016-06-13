// public/js/controllers/CandidateCtrl.js
angular.module('CandidateCtrl', []).controller('CandidateController',function($scope, candidate) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    candidate.get().then(
                            function(res){
                            $scope.candidates  = res.data;
                            
                            }
        );

});
