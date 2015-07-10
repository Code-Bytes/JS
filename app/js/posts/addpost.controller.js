(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('AddPostController', ['$scope', 'PostService', '$location',

    function ($scope, PostService, $location) {

      //New Post Method
      $scope.addPost = function (x) {

        // console.log($scope.NewPost);

        // $scope.header = {
        //   "Authorization": $rootScope.token
        // };

        // console.log($rootScope.token);

        // var req = {
        //    method: 'POST',
        //    url: 'https://pacific-hamlet-4796.herokuapp.com/posts/',
        //    headers: {
        //      'Authorization': $rootScope.token
        //    },
        //    data: $scope.NewPost
        //   };


        // $http(req)
        PostService.addNewPost(x)
          .success( function () {

              // console.log(data);
              // $location.path('/');

            // Route Home
            $location.path('/');
            $scope.post = {};
          });
      };



    }

  ]);

}());
