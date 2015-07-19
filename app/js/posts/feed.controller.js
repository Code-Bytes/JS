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

      $scope.feedParams = function(params) {

      };

      PostService.getPosts($scope.feedParams());

      $scope.searchTags = [];



      // Gets searchable tags from backend
      $scope.loadTags = function(query) {
        return $http.get('https://pacific-hamlet-4796.herokuapp.com/tags?search=' + query);
      };

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.feed = data;

        _.each($scope.feed, function(postInFeed){

          $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + postInFeed.id + '/comments',
          headers: {
            'Authorization': $scope.token
          },
          method: 'GET'
          })
          .success(function(data){
            postInFeed.numberOfComments = 0;
            _.each(data.comments, function(commentsOnPost){
              postInFeed.numberOfComments ++;
            });
          });
        });

      $scope.upvote = PostService.upvote;
      $scope.downvote = PostService.downvote;

      });

      $scope.getAllTags = PostService.getAllTags;
      $scope.getAllTags().success(function(data){
        $scope.tags = data;
        $scope.number = 30;
      });


    }

  ]);

}());
