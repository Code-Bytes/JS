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
            console.log($scope.post);
            console.log($scope.post.gist_id);
            $scope.postCreatorId = x.user_id;
          }
        });
        $scope.quantity = 10;
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

      // Function to create comment/reply tree

      var unflatten = function(array, parent, tree) {

        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : { id: null };

        var children = _.filter(array, function(child) {
          return child.parent_id == parent.id;
        });

        if(!_.isEmpty(children)) {
          if(parent.id === null) {
            tree = children;
          } else {
            parent['children'] = children;
          }
          _.each(children, function(child) {
            unflatten(array, child);
          });
        }
        return tree;
      };

      // Get all comments
      PostService.getComments(postId).success(function(data) {
        $scope.comments = data.comments;
        $scope.commentTree = unflatten($scope.comments);
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

      // Initialize comment form on scope
      // $scope.replyForm = {};

      $scope.addReply = function(reply, commentId) {
        PostService.addNewReply(reply, commentId).success(function() {
          console.log(commentId);
          console.log('added reply!');
          $scope.comments.push(reply);
          // $scope.reply = '';
        });
      };

      $scope.updateComment = function(comment, commentId) {
        console.log('clicked on edit button');
        PostService.editComment(comment, commentId).success(function() {
          console.log('successfully updated comment');
        });
      };

      $scope.deleteComment = function(commentId, index) {
        PostService.removeComment(commentId).success(function() {
          console.log('delete successful');
          $scope.comments.splice(index,1);
          // Route Home
          // $location.path('/');
        });
      };

    }

  ])

  .directive('collection', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        collection: '='
      },
      template: '<ul><member ng-repeat="member in collection" member="member"></member></ul>'
    };
  })

  .directive('member', function ($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        member: '='
      },
      templateUrl: '../js/templates/comments.tpl.html',
      // template: '<li><img ng-src="{{member.user.avatar}}"/> {{member.user.username}} {{member.content}}</li>',
      link: function (scope, element, attrs) {
              var collectionSt = "<collection collection='member.children'></collection>";
              if (angular.isArray(scope.member.children)) {
                $compile(collectionSt)(scope, function(cloned, scope) {
                  element.append(cloned);
                });
              }
            }
    };
  });

}());
