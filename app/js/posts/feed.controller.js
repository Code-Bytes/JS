  (function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['PostService', '$scope', '$rootScope', '$http', '$auth', '$stateParams', '$location', '$state',

    function (PostService, $scope, $rootScope, $http, $auth, $stateParams, $location, $state) {

      $scope.token = $auth.getToken();

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        }
      };

      PostService.getPosts();
      $scope.searchTags = [];
      $scope.xpParam = '';
      $scope.sort = $stateParams.sort;
      $scope.page = $stateParams.page;

      $scope.previousPage = function() {
        if ($scope.page > 1) {
          $scope.page--;
          PostService.getPosts($scope.tagParams, $scope.sort, $scope.page);
          $state.go('.', {page: $scope.page});
        }
      };

      $scope.nextPage = function(tagParams, sort) {
        PostService.getMetaData($scope.tagParams, $scope.sort).success(function(data) {
          var pages = Math.ceil(data.meta.total / 10);
          if ($scope.page < pages) {
            PostService.getPosts($scope.tagParams, $scope.sort, $scope.page++);
            $state.go('.', {page: $scope.page});
          }
        });
      };

      // Queries backend for posts containing any of multiple tags
      $scope.search = function() {
        var tagParams = $scope.searchTags.map(function(tag) {
          return tag.text;
        }).join(',');
        $scope.tagParams = tagParams + ',' + $scope.xpParam;
        // The line of code below updates the url but it changes behavior of passing params to getPosts function
        $location.path('/search').search({page: $scope.page, sort: $scope.sort, tags: $scope.tagParams});
        PostService.getPosts($scope.tagParams, $scope.sort, $scope.page);
      };

      $scope.reset = function(){
        $scope.searchTags = [];
        $scope.xpParam = '';
        $scope.sort = 'top';
        PostService.getPosts();
        $location.path('/#/');
      };

      // Gets searchable tags from backend
      $scope.loadTags = function(query) {
        return $http.get('https://pacific-hamlet-4796.herokuapp.com/tags?search=' + query);
      };

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.feed = data;

        $scope.dataReturned = function(){
          if ($scope.feed.length < 1) {
            return true;
          }
        };

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

      $scope.addTag = function(tag){
        $scope.searchTags.push(tag);
      };


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
        $scope.number = 20;
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
    }

  ])
  .directive('toggleClass', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          element.toggleClass(attrs.toggleClass);
        });
      }
    };
  });
}());
