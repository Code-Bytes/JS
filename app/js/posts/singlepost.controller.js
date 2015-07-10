(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['$scope', '$location', 'PostService', '$http', '$rootScope',

    function ($scope, $location, PostService, $http, $rootScope) {

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

        $scope.posts = data;

        // data.filter( function(x) {
        //   if (x.id == )
        // });


      });

    }

  ]);

}());
