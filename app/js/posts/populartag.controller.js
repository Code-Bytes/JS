  (function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('PopularTagController', ['PostService', '$scope', '$rootScope', '$http', '$auth', '$stateParams', '$location',

    function (PostService, $scope, $rootScope, $http, $auth, $stateParams, $location) {

      $scope.token = $auth.getToken();

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        }
      };

      PostService.getPopPosts();
      $scope.searchTags = [];
      $scope.xpParam = '';
      $scope.sort= '';

      // Queries backend for posts containing any of multiple tags
      $scope.searchPop = function(){
        var tagParams = $scope.searchTags.map(function(tag) {
          return tag.text;
        }).join(',');
        tagParams = tagParams + ',' + $scope.xpParam;
        $location.path('/search/' + tagParams);
      };

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

      });


      $scope.upvote = function (post) {

        PostService.upvote(post.id)
          .success ( function (data) {
            post.cached_votes_score = data.post.cached_votes_score;
            post.voted_for = true;
          });
      };

      $scope.downvote = function (post) {

        PostService.downvote(post.id)
          .success (function (data) {
            post.cached_votes_score = data.post.cached_votes_score;
            post.voted_for = false;
          });
      };

      $scope.getAllTags = PostService.getAllTags;
      $scope.getAllTags().success(function(data){
        $scope.tags = data;
        $scope.number = 30;
      });

      $scope.upVoted = function(vote){
        if (vote === true) {
          return true;
        } else {
          return false;
        }
      };

      $scope.downVoted = function(vote){
        if (vote === false) {
          return true;
        } else {
          return false;
        }
      };

      // Pagination

      $scope.totalItems = 64;
      $scope.currentPage = 4;

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

    }

  ]);

}());
