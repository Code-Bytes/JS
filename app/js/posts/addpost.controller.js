(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('AddPostController', ['$scope', 'PostService', '$location',

    function ($scope, PostService, $location) {

      //New Post Method
      $scope.addPost = function (x) {

        PostService.addNewPost(x)
          .success(function () {

            // Route Home
            $location.path('/');
            $scope.post = {};
          });
      };
    }

  ]);

}());
