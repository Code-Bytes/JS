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
        .state('feed', {
          url: '/feed',
          templateUrl: 'js/templates/feed.tpl.html',
          controller: 'FeedController'
        })
        .state('topQuestions', {
          url: '/topquestions',
          templateUrl: 'js/templates/topquestions.tpl.html',
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
