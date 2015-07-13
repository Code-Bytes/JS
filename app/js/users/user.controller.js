(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('UserController', ['$scope', 'UserService', '$auth', '$window', '$location',

    function ($scope, UserService, $auth, $window, $location) {

      $scope.currentUser = JSON.parse($window.localStorage.currentUser);

      $scope.getUser = UserService.getUser;

      $scope.getUser().success(function(data){
        $scope.thisUser = data;
      });

      $scope.getPosts = UserService.getPosts;

      $scope.getPosts().success(function(data){
        $scope.userPosts = data;
      });

    }

  ]);

}());
