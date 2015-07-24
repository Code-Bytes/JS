(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('EditPostController', ['PostService', 'UserService', '$scope', '$rootScope', '$stateParams', '$location',

    function (PostService, UserService, $scope, $rootScope, $stateParams, $location) {

      var postId = $stateParams.id;

      // Get all posts then filter
      PostService.getPosts();
      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;
        // Filter for clicked post id
        data.filter( function(x) {
          if (x.id == postId) {
            $scope.post = x;
            $scope.tags = $scope.post.tags;

          }
        });
      });

      //Array of tag objects
      $scope.xp = {
        text: ''
      };

      $scope.updatePost = function(post) {
        $scope.tags.push($scope.xp);
        post.tags = $scope.tags;
        PostService.editPost(postId, post).success(function() {
          // Route Home
          $location.path('/');
        });
      };

    }

  ]);

}());
