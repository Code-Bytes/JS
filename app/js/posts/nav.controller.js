(function (){

  'use strict';

  angular.module('CodeBytes')

  .controller('NavCtrl', ['PostService','$scope', '$rootScope', '$auth', '$window',

    function (PostService, $scope, $rootScope, $auth, $window) {

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
      };
    }

  ]);

}());
