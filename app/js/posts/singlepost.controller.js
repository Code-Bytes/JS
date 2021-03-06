(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['PostService', 'UserService', '$scope', '$rootScope', '$stateParams', '$location', 'singlePostResolve',

    function (PostService, UserService, $scope, $rootScope, $stateParams, $location, singlePostResolve) {

      var postId = $stateParams.id;

      // Loading gist
      $scope.post = singlePostResolve.data.post;
      $scope.post.whenCreated = moment($scope.post.created_at, "").fromNow();
      $scope.postCreatorId = $scope.post.user_id;
      $scope.gistId = $scope.post.gist_id;
      $scope.quantity = 10;

      UserService.thisUser().success(function (data) {
        $scope.currentUserId = data.user.id;
      });

      $scope.isCurrentUser = function() {
        if ($scope.currentUserId === $scope.postCreatorId) {
          return true;
        }
      };

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        }
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
            parent.children = children;
          }
          _.each(children, function(child) {
            unflatten(array, child);
          });
        }
        return tree;
      };

      // Get all comments

      function renderComments() {
        PostService.getComments(postId).success(function(data) {
          $scope.comments = data.comments;
          $scope.commentTree = unflatten($scope.comments);
        });
      }

      renderComments(); // Run immediately

      $rootScope.$on('Comment:Added', function () {
        renderComments();
      });

      $scope.addComment = function(comment) {
        PostService.addNewComment(comment, postId).success(function() {
          console.log('comment successfully sent!');
          renderComments();
          $scope.comment = {};
          $('#commentInput').val('');
        });
      };

      $scope.addReply = function(reply, commentId) {
        PostService.addNewReply(reply, commentId).success(function() {
          console.log('added reply!');
          $scope.comments.push(reply);
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
        });
      };

      // Get all posts for similar posts sidebar
      PostService.getPosts();
      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;
      });

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
      controller: function (PostService, UserService, $scope, $rootScope, $stateParams, $location) {

        var postId = $stateParams.id;

        $scope.getPost = PostService.getPost;

        $scope.getPost($stateParams.id).success(function(data) {
          $scope.post = data.post;
          $scope.postCreatorId = $scope.post.user_id;
        });

        UserService.thisUser().success(function (data) {
          $scope.currentUserId = data.user.id;
        });

        $scope.isCurrentUser = function() {
          if ($scope.currentUserId === $scope.postCreatorId) {
            return true;
          }
        };

        $scope.isLoggedIn = function () {
          var currentUser = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser) {
            return true;
          }
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
              parent.children = children;
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

        $scope.addReply = function(reply, commentId) {
          PostService.addNewReply(reply, commentId).success(function() {
            console.log('added reply!');
            $rootScope.$broadcast('Comment:Added', reply);
          });
        };

        // $scope.updateComment = function(comment, commentId) {
        //   console.log('clicked on edit button');
        //   PostService.editComment(comment, commentId).success(function() {
        //     console.log('successfully updated comment');
        //   });
        // };

        $scope.deleteComment = function(commentId, index) {
          PostService.removeComment(commentId).success(function() {
            console.log('delete successful');
            $scope.comments.splice(index,1);
          });
        };
      },

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
