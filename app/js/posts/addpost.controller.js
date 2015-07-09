(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('AddPostController', ['$scope', 'PostService', '$http', '$rootScope',

    function ($scope, PostService, $http, $rootScope) {

      //Post Constructor
      $scope.NewPost = {
        'title': '',
        'content': ''
      };

      //Post Object Instance
      // $scope.p = new NewPost();

      //New Post Method
      $scope.addPost = function () {

        console.log($scope.NewPost);

        $scope.header = {
          "Authorization": $rootScope.token
        };

        console.log($rootScope.token);

        var req = {
           method: 'POST',
           url: 'https://pacific-hamlet-4796.herokuapp.com/posts/',
           headers: {
             'Authorization': $rootScope.token
           },
           data: $scope.NewPost
          };


        $http(req)

          .success( function (data) {

              console.log(data);
              // $location.path('/');

          });
      };



    }

  ]);

}());
