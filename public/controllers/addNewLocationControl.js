var app = angular.module("myapp")

app.controller("addNewLocationControl", function($scope, mainService) {

  $scope.newPlace = {};

  $scope.addPlace = function() {
    mainService.addPlace($scope.newPlace);
    $scope.newPlace = {};
  }



});
