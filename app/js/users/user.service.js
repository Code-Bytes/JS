(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('UserService', ['$http', '$location', '$auth', '$window', '$rootScope', '$sce',

    function ($http, $location, $auth, $window, $rootScope, $sce) {

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
            // console.log(response.data);
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

    }

  ]);

}());
