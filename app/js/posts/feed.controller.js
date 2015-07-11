(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['$scope', '$auth', '$location', 'PostService', '$http', '$rootScope',

    function ($scope, $auth, $location, PostService, $http, $rootScope) {

      // $rootScope.postId; // Unsure why this is here?

      $scope.header = {
        "Authorization": $rootScope.token
      };

      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.feed = data;
      });

    }

  ]);

}());
