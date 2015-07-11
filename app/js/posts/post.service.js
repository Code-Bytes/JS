(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('PostService', ['$http', '$rootScope',

    function ($http, $rootScope) {

      var req = {
        method: 'POST',
        url: 'https://pacific-hamlet-4796.herokuapp.com/posts/',
        headers: {
          'Authorization': $rootScope.token
        },
      };

      //Post Constructor
      var Post = function(options) {
        this.title = options.title;
        this.content = options.content;
      };

      // $scope.NewPost = {
      //   'title': '',
      //   'content': ''
      // };

      // Get array of posts
      this.getPosts = function() {

      };

      // Add a new post
      this.addNewPost = function(post) {
        req.data = new Post(post);
        return $http(req);
      };
    }

  ]);

}());
