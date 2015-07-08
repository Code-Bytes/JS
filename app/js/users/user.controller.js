(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('UserController', ['$scope', 'UserService', '$auth',

    function($scope, UserService, $auth) {

      $scope.registerUser = function() {

      };

      $scope.loginUser = function() {

      };

      $scope.authenticate = function(provider, data) {
        $auth.authenticate(provider).then(function(response) {
           console.log(response.data);
        });

      };

      // Check if logged in
      $scope.isAuthenticated = function() {

      };

      // Connect account with GitHub
      $scope.linkGithub = function() {

      };


    }

  ]);

}());
