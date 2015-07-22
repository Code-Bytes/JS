(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('PostService', ['$http', '$rootScope', '$auth', '$stateParams',

    function ($http, $rootScope, $auth, $stateParams) {

      //Gets User Token
      var token       = $auth.getToken(),
          postUrl     = 'https://pacific-hamlet-4796.herokuapp.com/posts/',
          commentUrl  = 'https://pacific-hamlet-4796.herokuapp.com/comments/',
          tagUrl      = 'https://pacific-hamlet-4796.herokuapp.com/tags';

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
        this.gist_id = options.gist_id;
        this.tags = options.tags.map(function(tag) {
          return tag.text;
        }).join(',');
        this.gist_id = options.gist_id;
      };

      // Add a new post
      this.addNewPost = function(post) {
        var postReq = feedReq;
        postReq.method = 'POST';
        postReq.data = new Post(post);
        return $http(postReq);
      };

    //Start Methods to Get Post and User info for feed

      // Get array of posts
      this.getPosts = function(tagParam, sortParam) {

        var getReq = feedReq;
        getReq.method = 'GET';
        var params = {
          tags: tagParam,
          sort: sortParam
        };
        getReq.params = params;

        $http(getReq).success( function (data) {
          console.log(data);
          if (data !== null) {
            _.each(data.posts, function(x){

              var createdTime = x.created_at;
              x.createdAtTime = function(){
                return moment(createdTime, "").fromNow();
              };

              var updatedTime = x.updated_at;
              x.updatedAtTime = function(){
                return moment(updatedTime, "").fromNow();
              };
            });

            $rootScope.$broadcast('PostsReceived', data.posts);
          }
        });
      };

      // Get array of posts
      this.getPopPosts = function() {

        var getReq = feedReq;
        getReq.method = 'GET';
        getReq.params = $stateParams;

        $http(getReq).success( function (data) {

          _.each(data.posts, function(x){

            var createdTime = x.created_at;
            x.createdAtTime = function(){
              return moment(createdTime, "").fromNow();
            };

            var updatedTime = x.updated_at;
            x.updatedAtTime = function(){
              return moment(updatedTime, "").fromNow();
            };
          });

          $rootScope.$broadcast('PostsReceived', data.posts);
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

      this.getComments = function(postId) {
        return $http({
          url: postUrl + postId + '/comments',
          headers: {
            'Authorization': token
          },
          method: 'GET'
        });
      };

      this.addNewReply = function(reply, commentId) {
        return $http({
          url: commentUrl + commentId + '/reply',
          headers: {
            'Authorization': token
          },
          method: 'POST',
          data: new Comment(reply)
        });
      };

      this.editComment = function(comment, commentId) {
        return $http({
          url: commentUrl + commentId,
          headers: {
            'Authorization': token
          },
          method: 'PUT',
          data: comment
        });
      };

      this.removeComment = function(commentId) {
        return $http({
          url: commentUrl + commentId,
          headers: {
            'Authorization': token
          },
          method: 'DELETE'
        });
      };

    //Voting Methods
      this.upvote = function(id){
        return $http({
          url: postUrl + id + '/like',
          headers: {
            'Authorization': token
          },
          method: 'PUT'
        });
      };

      this.downvote = function(id){
        return $http({
          url: postUrl + id + '/dislike',
          headers: {
            'Authorization': token
          },
          method: 'PUT'
        });
      };

    //Pulls tags

      this.getAllTags = function(){
        return $http({
          url: tagUrl,
          headers: {
            'Authorization': token
          },
          method: 'GET'
        });
      };

      this.getPost = function(id){
        return $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/posts/' + id,
          headers: {
            'Authorization': token
          },
          method: 'GET'
        });
      };

    }

  ]);

}());
