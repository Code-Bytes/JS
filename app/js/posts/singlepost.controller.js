(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['PostService', 'UserService', '$scope', '$rootScope', '$stateParams', '$sce', '$location',

    function (PostService, UserService, $scope, $rootScope, $stateParams, $sce, $location) {

      var postId = $stateParams.id;

      // var currentUserId;
      UserService.thisUser().success(function (data) {
        $scope.currentUserId = data.user.id;
      });

      $scope.isCurrentUser = function() {
        if ($scope.currentUserId === $scope.postCreatorId) {
          return true;
        // } else {
        //   return false;
        }
      };

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        // } else {
        //   return false;
        }
      };

      // Get all posts then filter
      PostService.getPosts();
      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;
        // Filter for clicked post id
        data.filter( function(x) {
          if (x.id == postId) {
            $scope.post = x;
            $scope.postCreatorId = x.user_id;
          }
        });
      });

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

      // Get all comments
      PostService.getComments(postId).success(function(data) {
        $scope.comments = data.comments;
        console.log($scope.comments);
      });

      // Initialize comment form on scope
      // $scope.commentForm = {};

      $scope.addComment = function(comment) {
        PostService.addNewComment(comment, postId).success(function() {
          console.log('comment successfully sent!');
          // $scope.comment = '';
          // $scope.commentForm.$setPristine();
          // var master = { content: '' };
          // $scope.comment = angular.copy(master);
        });
      };

      // Reply form - Was advised to put logic for reply form toggle in controller not in template
      // however, toggle happens on all comments, instead of just the one user clicks reply for
      // $scope.showForm = false;

      // $scope.toggleForm = function() {
      //   $scope.showForm = !$scope.showForm;
      // };

      // Initialize comment form on scope
      // $scope.replyForm = {};


      $scope.addReply = function(reply, commentId) {
        PostService.addNewReply(reply, commentId).success(function() {
          console.log(commentId);
          console.log('added reply!');
          // $scope.reply = '';
        });
      };

      $scope.deleteComment = function(commentId) {
        PostService.removeComment(commentId).success(function() {
          console.log('delete successful');
          // Route Home
          // $location.path('/');
        });
      };

    }

  ]);

}());
