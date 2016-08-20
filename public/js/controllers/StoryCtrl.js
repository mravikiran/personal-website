// public/js/controllers/CandidateCtrl.js
angular.module('StoryCtrl', []).controller('StoryController',function($scope, StoryService) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.storyLengths = [ '4','6'];
    $scope.storyLevels = [	{ name: 'mehh', value: '1'},
    						{ name: 'now we are talking', value:'2'},
    						{ name: 'its getting hot in here' , value: '3' },
    						{ name: 'What the FCUK', value:'4'}
    						];
    
    //StoryService.get
    //StoryService.post
   

});
