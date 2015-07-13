(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('UserController', ['$scope', 'UserService', '$auth', '$window', '$location',

    function ($scope, UserService, $auth, $window, $location) {

      $scope.currentUser = JSON.parse($window.localStorage.currentUser);




    }

  ]);

}());
