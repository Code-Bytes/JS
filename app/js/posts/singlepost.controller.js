(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['PostService', 'UserService', '$scope', '$rootScope', '$stateParams', '$sce',

    function (PostService, UserService, $scope, $rootScope, $stateParams, $sce) {

      var id = $stateParams.id;

      // var currentUser = JSON.parse(localStorage.getItem("currentUser"));

      // Get all posts then filter
      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;

        // Filter for clicked post creator id
        data.filter( function(x) {
          if (x.id == id) {
            $scope.post = x;
          }

        });

      });

      $scope.gistHtml = function (gistId) {
        var gistMarkup = '<code data-gist-highlight-line="1-5" class="large-10 columns" data-gist-id="' + gistId +'"></code>';
        return $sce.trustAsHtml(gistMarkup);
      };

      $scope.isCurrentUser = function() {
        // UserService.thisUser().success(function() {

        // })
      };

    }

  ]);

}());
