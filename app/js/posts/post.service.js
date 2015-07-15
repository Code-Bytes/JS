(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('PostService', ['$http', '$rootScope', '$auth',

    function ($http, $rootScope, $auth) {

      //Gets User Token
      var token = $auth.getToken();
      var postUrl = 'https://pacific-hamlet-4796.herokuapp.com/posts/';

      // Defines AJAX params for posts
      var feedReq = {
        url: postUrl,
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
          url: postUrl + postId,
          headers: {
            'Authorization': token
          },
          method: 'PUT',
          data: post
        });
      };

      this.removePost = function(postId) {
        return $http({
          url: postUrl + postId,
          headers: {
            'Authorization': token
          },
          method: 'DELETE'
        });
      };

//Comment Methods
      //Comment Constructor
      var Comment = function(options) {
        this.content = options.content;
      };

      // Add a new post
      this.addNewComment = function(comment, postId) {
        return $http({
          url: postUrl + postId + '/comments',
          headers: {
            'Authorization': token
          },
          method: 'POST',
          data: new Comment(comment)
        });
      };

      this.getComments = function() {
        return $http({
          url: postUrl + postId + '/comments',
          headers: {
            'Authorization': token
          },
          method: 'GET'
        });
      };


//Voting Methods
      this.upvote = function(id){
        $http({
          url: postUrl + id + '/like',
          headers: {
            'Authorization': token
          },
          method: 'PUT'
        });
      };

      this.downvote = function(id){
        $http({
          url: postUrl + id + '/dislike',
          headers: {
            'Authorization': token
          },
          method: 'PUT'
        });
      };

    }

  ]);

}());
