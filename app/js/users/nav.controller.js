(function (){

  'use strict';

  angular.module('CodeBytes')

  .controller('NavController', ['UserService','$scope', '$auth',

    function (UserService, $scope, $auth) {

      $scope.githubLogin = function() {
        UserService.ghLogin();
      };

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.avatar = function(){
        return UserService.getAvatar();
      };

      $scope.avatarLink = function(){
        UserService.avatarUrl();
      };

      $scope.logout = function() {
        UserService.logOut();
      };

    }

  ]);

}());
