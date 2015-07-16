(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['PostService', '$scope', '$rootScope',

    function (PostService, $scope, $rootScope) {

      $scope.isLoggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return true;
        }
      };

      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.feed = data;

      $scope.upvote = PostService.upvote;

      $scope.downvote = PostService.downvote;


      });

    }

  ]);

}());
