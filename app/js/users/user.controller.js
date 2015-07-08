(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('UserController', ['$scope', 'UserService', '$auth', '$window', '$location', '$rootScope',

    function ($scope, UserService, $auth, $window, $location, $rootScope) {

      // $scope.registerUser = function () {

      // };

      // $scope.loginUser = function () {

      // };


      $scope.githubLogin = function() {
        $auth.authenticate('github')
          .then(function(response) {
            $window.localStorage.currentUser = JSON.stringify(response.data.user);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            console.log($rootScope.currentUser);
          })
          .catch(function(response) {
            // console.log(response.data);
          });
      };

      // $scope.authenticate = function (provider) {
      //   $auth.authenticate(provider);
      // };

      // Check if logged in
      // $scope.isAuthenticated = function () {

      // };

      // Connect account with GitHub
      // $scope.linkGithub = function () {

      // };


    }

  ]);

}());
