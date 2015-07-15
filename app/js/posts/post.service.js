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
        console.log(postReq);
        return $http(postReq);
      };
//End Add Post Methods

//Start Methods to Get Post and User info for feed

      // Get array of posts
      this.getPosts = function() {

        var getReq = feedReq;
        getReq.method = 'GET';
        $http(getReq).success( function (data) {

          _.each(data.posts, function(x){

            var postTime = x.created_at;
            x.time = function(){
              return moment(postTime, "YYYYMMDD").fromNow();
            };

          });
          $rootScope.$broadcast('PostsReceived', data.posts.reverse());

        });
      };

      this.editPost = function(postId, post) {
        return $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + postId,
          headers: {
            'Authorization': token
          },
          method: 'PUT',
          data: post
        });
      };

      this.removePost = function(postId) {
        return $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + postId,
          headers: {
            'Authorization': token
          },
          method: 'DELETE'
        });
      };

//Voting Methods
      this.upvote = function(id){
        $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + id + '/like',
          headers: {
            'Authorization': token
          },
          method: 'PUT'
        });
      };

      this.downvote = function(id){
        $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + id + '/dislike',
          headers: {
            'Authorization': token
          },
          method: 'PUT'
        });
      };


    }

  ]);

}());
