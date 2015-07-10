(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('FeedController', ['$scope', '$auth', '$location', 'PostService', '$http', '$rootScope',

    function ($scope, $auth, $location, PostService, $http, $rootScope) {

      $rootScope.postId;

      $scope.header = {
        "Authorization": $rootScope.token
      };

      var req = {
         method: 'GET',
         url: 'https://pacific-hamlet-4796.herokuapp.com/posts/',
         headers: {
           'Authorization': $rootScope.token
         }
      };

      $http(req)

      .success( function (data) {

        $scope.feed = data;
        console.log($scope.feed);

      });

    }




  ]);

}());
