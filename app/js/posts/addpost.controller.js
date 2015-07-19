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

      var tags = [];

      $scope.getTags = function() {
        PostService.getTags().success(function(data) {
          // _.each(data.tags, function(x) {
          //   tags.push(x.name);
          console.log('get tags');
          // });
        });
        console.log(tags);
        return(tags);
      };
    }

  ]);

}());
