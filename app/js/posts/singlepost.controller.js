(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('SinglePostController', ['PostService', '$scope', '$rootScope', '$stateParams',

    function (PostService, $scope, $rootScope, $stateParams) {

      var id = $stateParams.id;

      // $scope.header = {
      //   "Authorization": $rootScope.token
      // };
      // Not sure if needed? ^

      // Get all posts then filter
      PostService.getPosts();

      $rootScope.$on('PostsReceived', function (event, data) {
        $scope.posts = data;

        // Filter for clicked post's ID
        data.filter( function(x) {
          if (x.id == id){
            $scope.post = x;
          }

        });

      });

    }

  ]);

}());
