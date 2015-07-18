(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['PostService', '$scope', '$rootScope', '$http', '$auth',

    function (PostService, $scope, $rootScope, $http, $auth) {

      $scope.token = $auth.getToken();

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        }
      };

      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.feed = data;

        _.each($scope.feed, function(postInFeed){
          postInFeed.numberOfComments = 0;
          $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + postInFeed.id + '/comments',
          headers: {
            'Authorization': $scope.token
          },
          method: 'GET'
          })
          .success(function(data){

            _.each(data.comments, function(commentsOnPost){
              postInFeed.numberOfComments ++;
            });
          });
        });

        console.log($scope.feed);

      $scope.upvote = PostService.upvote;

      $scope.downvote = PostService.downvote;


      });

    }

  ]);

}());
