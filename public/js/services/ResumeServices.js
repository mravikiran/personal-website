// public/js/services/CandidateService.js
angular.module('ResumeServices', [] ).factory('resumeService',['$http', 'authenticationService', function($http,authenticationService) {

        var resumeFactory = {};
        // call to get all nerds
        resumeFactory.get = function(candidateName) {
           return  $http.post('/api/candidates', { name : candidateName }, {
                                                    headers: {
                                                        Authorization: 'Bearer '+ authenticationService.getToken()
                                                            }
                                                }

                                            );
        };


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        resumeFactory.create = function(candidateData) {
           // return $http.post('/api/candidates', candidateData);
            return 'The post method here';
        };

        return resumeFactory;       

}]);
