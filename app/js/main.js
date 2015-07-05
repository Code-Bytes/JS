(function() {
  'use strict';

  angular.module('CodeBytes', ['ui.router'])

  .config([ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('signup', {
          url: '/signup',
          templateUrl: 'js/templates/signup.tpl.html',
          controller: 'UserController'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'js/templates/signin.tpl.html',
          controller: 'UserController'
        })
        .state('feed', {
          url: '/feed',
          templateUrl: 'js/templates/feed.tpl.html',
          controller: 'FeedController'
        })
        .state('/addpost', {
          url: '/addpost',
          templateUrl: 'js/templates/addpost.tpl.html',
          controller: 'AddPostController'
        })
        .state('post', {
          url: '/post/:id',
          templateUrl: 'js/templates/singlepost.tpl.html',
          controller: 'SinglePostController'
        })
        .state('profile', {
          url: '/profile/:id',
          templateUrl: 'js/templates/profile.tpl.html',
          controller: 'UserController'
        });
    }
  ]);

}());
