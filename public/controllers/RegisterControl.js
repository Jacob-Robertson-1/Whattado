var app = angular.module("myapp")

app.controller("RegisterControl", function($scope, mainService) {

  $scope.newUser = {};

  $scope.addUser = function() {
    mainService.addUser($scope.newUser);
    $scope.newUser = {};
  }

});
