(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['PostService', '$scope', '$rootScope',

    function (PostService, $scope, $rootScope) {

      // $rootScope.postId; // Unsure why this is here?

      // $scope.header = {
      //   "Authorization": $rootScope.token
      // };

      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.feed = data;

      });

    }

  ]);

}());
