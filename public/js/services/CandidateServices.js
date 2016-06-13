// public/js/services/CandidateService.js
angular.module('CandidateServices', [] ).factory('candidate',['$http', function($http) {

        var candidateFactory = {};
        // call to get all nerds
        candidateFactory.get = function() {
           return  $http.get('/api/candidates');
        };


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        candidateFactory.create = function(candidateData) {
           // return $http.post('/api/candidates', candidateData);
            return 'The post method here';
        };

        return candidateFactory;       

}]);
