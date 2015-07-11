(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('PostService', ['$http', '$rootScope',

    function ($http, $rootScope) {

      var req = {
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

      // Get array of posts
      this.getPosts = function() {
        var getReq = req;
        getReq.method = 'GET';
        $http(getReq).success( function (data) {
          $rootScope.$broadcast('PostsReceived', data);
        });
      };

      // Add a new post
      this.addNewPost = function(post) {
        var postReq = req;
        postReq.method = 'POST';
        postReq.data = new Post(post);
        return $http(postReq);
      };
    }

  ]);

}());
