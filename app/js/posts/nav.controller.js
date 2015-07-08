(function (){

  'use strict';

  angular.module('CodeBytes')

  .controller('NavController', ['PostService','$scope', '$rootScope', '$auth', '$window', '$location', '$rootScope',

    function (PostService, $scope, $rootScope, $auth, $window) {

      $scope.githubLogin = function() {
        $auth.authenticate('github')
          .then(function(response) {
            $window.localStorage.currentUser = JSON.stringify(response.data.user);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            console.log('in github login function in user controller');
            console.log($rootScope.currentUser);
          })
          .catch(function(response) {
            console.log(response.data);
          });
      };

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
      };

      console.log($auth.getPayload());
      console.log($auth.getToken());
      $scope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      console.log($scope.currentUser.avatar);
    }

  ]);

}());
