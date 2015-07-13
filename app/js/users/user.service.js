(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('UserService', ['$http', '$location', '$auth', '$window', '$rootScope', '$sce', '$stateParams',

    function ($http, $location, $auth, $window, $rootScope, $sce, $stateParams) {

      var token = $auth.getToken();

      var isLoggedIn = function() {
        if ($auth.getToken() !== null){
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
            $rootScope.token = $auth.getToken();
            $location.path('/');
          })
          .catch(function(response) {
          });
      };

      this.getAvatar = function() {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
      };

      this.thisUser = {};

      this.getUser = function(){
        // Defines AJAX params for users
        var id = $stateParams.id;
        var userReq = {
          url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + id,
          headers: {
            'Authorization': $rootScope.token
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
        console.log(id);
        var postReq = {
          url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + id + '/posts',
          headers: {
            'Authorization': $rootScope.token
          },
          method: 'GET'
        };
        return $http(postReq);
      };

    }

  ]);

}());
