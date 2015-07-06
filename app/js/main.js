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
        .state('login', {
          url: '/login',
          templateUrl: 'js/templates/login.tpl.html',
          controller: 'UserController'
        })
        .state('home', {
          url: '/',
          templateUrl: 'js/templates/feed.tpl.html',
          controller: 'FeedController'
        })
        .state('topPosts', {
          url: '/topposts',
          templateUrl: 'js/templates/topposts.tpl.html',
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
        .state('about', {
          url: '/about',
          templateUrl: 'js/templates/about.tpl.html',
          controller: 'FeedController'
        })
        .state('profile', {
          url: '/myprofile',
          templateUrl: 'js/templates/profile.tpl.html',
          controller: 'UserController'
        });
    }
  ]);

}());
