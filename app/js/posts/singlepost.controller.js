(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['PostService', 'UserService', '$scope', '$rootScope', '$stateParams', '$sce', '$location',

    function (PostService, UserService, $scope, $rootScope, $stateParams, $sce, $location) {

      var postId = $stateParams.id;

      var currentUserId;
      UserService.thisUser().success(function (data) {
        currentUserId = data.user.id;
      });

      // var currentUser = JSON.parse(localStorage.getItem("currentUser"));

      // Get all posts then filter
      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;

        // Filter for clicked post  id
        data.filter( function(x) {
          if (x.id == postId) {
            $scope.post = x;
            $scope.postCreatorId = x.user_id;
          }

        });

      });

      $scope.gistHtml = function(gistId) {
        var gistMarkup = '<code data-gist-highlight-line="1-5" class="large-10 columns" data-gist-id="' + gistId +'"></code>';
        return $sce.trustAsHtml(gistMarkup);
      };

      $scope.isCurrentUser = function() {
        if (currentUserId === $scope.postCreatorId) {
          return true;
        } else {
          return false;
        }
      };

      $scope.updatePost = function(post) {
        PostService.editPost(postId, post).success(function() {
          // Route Home
          $location.path('/');
        });
      };

      $scope.deletePost = function() {
        PostService.removePost(postId).success(function() {
          // Route Home
          $location.path('/');
        });
      };
    }

  ]);

}());
