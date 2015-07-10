(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('PostService', ['$http', '$rootScope',

    function ($http, $rootScope) {

      //Post Constructor
      var Post = function(options) {
        this.title = options.title;
        this.content = options.content;
      };

      // $scope.NewPost = {
      //   'title': '',
      //   'content': ''
      // };

      // Add a new post
      this.addNewPost = function(post) {
        var x = new Post(post);

        var req = {
           method: 'POST',
           url: 'https://pacific-hamlet-4796.herokuapp.com/posts/',
           headers: {
             'Authorization': $rootScope.token
           },
           data: x
        };
        return $http(req);
      }
    }

  ]);

}());
