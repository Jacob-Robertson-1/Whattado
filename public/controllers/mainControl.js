var app = angular.module("myapp")

app.controller("mainControl", ["$scope", "mainService", function($scope, mainService) {

  $scope.skip_place = 0;
  $scope.limit = 10

  var load = function() {
    mainService.getPlace($scope.skip_place).then(function(Places) {
      $scope.places = Places;
    })
  }

  $scope.nextPage = function() {
    $scope.skip_place += $scope.limit;
    load();
  };

  $scope.prevPage = function() {
    $scope.skip_place -= $scope.limit;
    load();
  };


}]);
