(function() {
  'use strict';

  var endpoint = 'https://pacific-hamlet-4796.herokuapp.com/auth/';

  angular.module('CodeBytes', ['ui.router', 'ngMessages', 'satellizer'])

  .config([ '$stateProvider', '$urlRouterProvider', '$authProvider',
    function ($stateProvider, $urlRouterProvider, $authProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'js/templates/login.tpl.html',
          controller: 'NavController'
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


      $authProvider.github({
        clientId: 'c5dc1797fa0f28e2bdef',
      });

      $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
      $authProvider.loginOnSignup = true;
      $authProvider.baseUrl = '/';  // API Base URL for the paths below.
      $authProvider.loginRedirect = '/';
      $authProvider.logoutRedirect = '/';
      $authProvider.signupRedirect = '/login';
      $authProvider.loginUrl = '/auth/login';
      $authProvider.signupUrl = '/auth/signup';
      $authProvider.loginRoute = '/login';
      $authProvider.signupRoute = '/signup';
      $authProvider.tokenRoot = false; // set the token parent element if the token is not the JSON root
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
      $authProvider.unlinkUrl = '/auth/unlink/';
      $authProvider.unlinkMethod = 'get';
      $authProvider.authHeader = 'Authorization';
      $authProvider.authToken = 'Bearer';
      $authProvider.withCredentials = true;
      $authProvider.platform = 'browser'; // or 'mobile'
      $authProvider.storage = 'localStorage'; // or 'sessionStorage'

      $authProvider.loginUrl = endpoint + 'login';
      // $authProvider.signupUrl = endpoint + 'signup';

      $authProvider.github({
        url: endpoint + 'github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
        scope: [],
        scopeDelimiter: ' ',
        type: '2.0',
        popupOptions: { width: 1020, height: 618 }
      });




    }

  ]);

  // .run(function($rootScope, $window, $auth) {
  //   if ($auth.isAuthenticated()) {
  //     $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
  //   }

  // });

}());
