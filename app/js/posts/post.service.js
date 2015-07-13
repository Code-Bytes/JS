(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('PostService', ['$http', '$rootScope', '$auth',

    function ($http, $rootScope, $auth) {

      //Gets User Token
      var token = $auth.getToken();

      // Defines AJAX params for posts
      var feedReq = {
        url: 'https://pacific-hamlet-4796.herokuapp.com/posts/',
        headers: {
          'Authorization': token
        },
      };


// Start Add Post Methods
      //Post Constructor
      var Post = function(options) {
        this.title = options.title;
        this.content = options.content;
      };

      // Add a new post
      this.addNewPost = function(post) {
        var postReq = feedReq;
        postReq.method = 'POST';
        postReq.data = new Post(post);
        return $http(postReq);
      };
//End Add Post Methods


//Start Methods to Get Post and User info for feed

      // Get array of posts
      this.getPosts = function() {

        var getReq = feedReq;
        getReq.method = 'GET';
        $http(getReq).success( function (data) {
          _.each(data, function(x){
        // Defines AJAX params for users
            var userReq = {
              url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + x.user_id,
              headers: {
                'Authorization': token
              },
            };
            var getReq = userReq;
            getReq.method = 'GET';
            $http(getReq).success(function(data){
              x.creator = data.username;
              x.avatar = data.avatar;
            });

          });
          $rootScope.$broadcast('PostsReceived', data);
        });
      };



    }

  ]);

}());
