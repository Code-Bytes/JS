(function (){

  'use strict';

  angular.module('CodeBytes')

  .controller('NavController', ['PostService','$scope', '$rootScope', '$auth', '$window', '$location', '$sce', '$http',

    function (PostService, $scope, $rootScope, $auth, $window, $location, $sce, $http) {

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

      console.log($rootScope.currentUser);

      // Trying to pull html_url from currentUser.url, which returns
      // JSON data for user--may need backend to give this to us
      /*
      var apiUrl = $rootScope.currentUser.url;
      console.log(apiUrl);
      $scope.html_url = '';
      $http.get(apiUrl).success(function(data) {
        console.log("success!");
        $scope.html_url = data.html_url;
          console.log(data.html_url);
      });
      */

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
