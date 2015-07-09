(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('AddPostController', ['$scope', 'PostService', '$http', '$rootScope',

    function ($scope, PostService, $http, $rootScope) {

      //Post Constructor
      var NewPost = function () {
        this.title = '';
        this.content = '';
      };

      //Post Object Instance
      $scope.p = new NewPost();

      //New Post Method
      $scope.addPost = function () {

      console.log($scope.p);

      $http.post('https://pacific-hamlet-4796.herokuapp.com/'  + 'posts/', {'Authorization': $rootScope.token}, $scope.p)

        .success( function (data) {

            console.log(data);
            // $location.path('/');

        });
    };



    }

  ]);

}());
