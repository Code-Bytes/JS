(function (){

  'use strict';

  angular.module('CodeBytes')

  .controller('NavController', ['PostService','$scope', '$rootScope', '$auth', '$window', '$location', '$sce',

    function (PostService, $scope, $rootScope, $auth, $window, $location, $sce) {

      $scope.githubLogin = function() {
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


      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
        $rootScope.token = null;
        $location.path('/');
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem("currentUser"));

      $rootScope.token = $auth.getToken();

      $rootScope.isLoggedIn = function(){
        if ($rootScope.token !== null){
          return true;
        } else {
          return false;
        }
      };

      $scope.avatar = function(){
        if ($rootScope.isLoggedIn() === true){
          return $sce.trustAsHtml('<img class="avatar" src="' + JSON.parse(localStorage.getItem("currentUser")).avatar + '">');
        } else {
          return $sce.trustAsHtml('<i class="fa fa-user fa-2x portrait"></i>');
        }
      };

      $scope.avatarLink = function(){
        if ($rootScope.isLoggedIn() === true){
          return '/#/myprofile';
        } else {
          return '/#/login';
        }
      };
    }

  ]);

}());
