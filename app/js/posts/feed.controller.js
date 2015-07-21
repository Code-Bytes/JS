(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['PostService', '$scope', '$rootScope', '$http', '$auth', '$stateParams', '$location',

    function (PostService, $scope, $rootScope, $http, $auth, $stateParams, $location) {

      $scope.token = $auth.getToken();

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        }
      };

      PostService.getPosts();
      $scope.searchTags = [];

      // Queries backend for posts containing any of multiple tags
      $scope.search = function(){
        var searchParams = $scope.searchTags.map(function(tag) {
          return tag.text;
        }).join(',');
        $location.path('/search/' + searchParams);
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

      // $rootScope.$on('PostsReceived', function (event, data) {
      //   $scope.totalItems = data.length;
      //   console.log($scope.totalItems);
      //   $scope.currentPage = 1;
      // });


      $scope.totalItems = 100;
      $scope.currentPage = 1;

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

    }

  ]);

}());
