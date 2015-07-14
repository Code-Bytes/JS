(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('UserService', ['$http', '$location', '$auth', '$window', '$rootScope', '$sce', '$stateParams',

    function ($http, $location, $auth, $window, $rootScope, $sce, $stateParams) {

      var token = $auth.getToken();

      var isLoggedIn = function() {
        if (token !== null){
          return true;
        } else {
          return false;
        }
      };

      this.ghLogin = function() {
        $auth.authenticate('github')
          .then(function(response) {
            $window.localStorage.currentUser = JSON.stringify(response.data.user);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            $rootScope.token = token;
            $location.path('/');
            $route.reload();
          })
          .catch(function(response) {
          });
      };

      this.getAvatar = function() {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(isLoggedIn());
        if (isLoggedIn() === true) {
          return $sce.trustAsHtml('<img class="avatar" src="' + currentUser.avatar + '">');
        } else {
          return $sce.trustAsHtml('<i class="fa fa-user fa-2x portrait"></i>');
        }
      };

      this.avatarUrl = function() {
        if (isLoggedIn() === true){
          return '/#/myprofile';
        } else {
          return '/#/login';
        }
      };

      this.logOut = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
        $rootScope.token = null;
        $location.path('/');
        $route.reload();
      };

      this.thisUser = function() {
        return $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/me',
          headers: {
            'Authorization': token
          },
          method: 'GET'
        });
      };

      this.getUser = function(){

        // Defines AJAX params for users
        var id = $stateParams.id;
        var userReq = {
          url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + id,
          headers: {
            'Authorization': token
          },
          method: 'GET'
        };
        return $http(userReq);
      };

      this.getPosts = function(){

        // Defines AJAX params for users
        var idFunc = function(){
          if ($stateParams.id === undefined){
            return token.id;
          } else {
            return $stateParams.id;
          }
        };
        var id = idFunc();

        var postReq = {
          url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + id + '/posts',
          headers: {
            'Authorization': token
          },
          method: 'GET'
        };
        return $http(postReq);
      };

    }

  ]);

}());
