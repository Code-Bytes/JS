(function (){

  'use strict';

  angular.module('CodeBytes')

  .controller('NavController', ['UserService','$scope', '$auth',

    function (UserService, $scope, $auth) {

      $scope.githubLogin = function() {
        return UserService.ghLogin();
      };

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };
      $scope.isAuthenticated();

      $scope.avatar = function() {
        return UserService.getAvatar();
      };
      $scope.avatar();

      $scope.avatarLink = function() {
        return UserService.avatarUrl();
      };
      $scope.avatarLink();

      $scope.logout = function() {
        return UserService.logOut();
      };

    }

  ]);

}());
