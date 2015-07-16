(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('AddPostController', ['PostService', '$scope', '$location',

    function (PostService, $scope, $location) {

      //New Post Method
      $scope.addPost = function (x) {

        PostService.addNewPost(x)
          .success(function () {

            // Route Home
            $location.path('/');
            $scope.post = {};
          });
      };

      //Pulls tags from StackExchange
      $scope.getTags = PostService.getTags();
    }

  ]);

}());
