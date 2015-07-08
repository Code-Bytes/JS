(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['$scope', '$auth', '$location', 'PostService',

    function ($scope, $auth, $location, PostService) {

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

    }

  ]);

}());
