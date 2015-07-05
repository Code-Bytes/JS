(function() {
  'use strict';

  angular.module('CodeBytes', ['ui.router'])

  .config([ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('signup', {
          url: '/signup',
          templateUrl: 'js/templates/signup.html',
          controller: 'SignUpController'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'js/templates/signin.html',
          controller: 'SignInController'
        })
        .state('feed', {
          url: '/feed',
          templateUrl: 'js/templates/feed.html',
          controller: 'FeedController'
        .state('profile', {
          url: '/profile :id',
          templateUrl: 'js/templates/profile.html',
          controller: 'ProfileController'
        })
        });
    }
  ]);

}());
