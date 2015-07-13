(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['PostService', '$scope', '$rootScope', '$stateParams',

    function (PostService, $scope, $rootScope, $stateParams) {

      var id = $stateParams.id;

      // var currentUser = JSON.parse(localStorage.getItem("currentUser"));

      // Get all posts then filter
      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;
        console.log($scope.posts[2].title);

        // Filter for clicked post creator id
        data.filter( function(x) {
          if (x.id == id) {
            $scope.post = x;
          }

        });

      });

      $scope.isCurrentUser = function() {
        // if () {

        // }
      };

    }

  ]);

}());
