(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('UserController', ['$scope', 'UserService', '$auth', '$window', '$location',

    function ($scope, UserService, $auth, $window, $location) {

      $scope.currentUser = function(){
        if ($auth.isAuthenticated() === true) {
          return JSON.parse($window.localStorage.currentUser);
        } else {
          return undefined;
        }
      };

      $scope.getUser = UserService.getUser;

      $scope.getUser().success(function(data){
        $scope.thisUser = data.user;
      });

      $scope.getPosts = UserService.getPosts;

      $scope.postNumber = 0;

      $scope.getPosts().success(function(data){
        $scope.userPosts = data.users;

        _.each($scope.userPosts, function(x){
          $scope.postNumber ++;
          var postTime = x.created_at;
          x.time = function(){
            return moment(postTime, "YYYYMMDD").fromNow();
          };

        });
      });




    }

  ]);

}());
