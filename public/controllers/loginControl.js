var app = angular.module("myapp")

app.controller("loginControl", function($scope, loginService) {

  $scope.login = function(user) {
    loginService.login(user, $scope); // will call login service

  }

});
