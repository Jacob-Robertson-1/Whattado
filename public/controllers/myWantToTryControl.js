var app = angular.module("myapp")

app.controller("myWantToTryControl", function($scope, mainService) {

  $scope.init = function() {
    mainService.getMyWantToTryPlaces().then(function(results) {
      $scope.places = results;
    });
  }

  $scope.moveToFavorite = function(place) {
    userService.moveToFavorite(place).then(function() {
      //
    });

  };

  $scope.removeWantToTry = function(place) {
    userService.removeWantToTry(place).then(function() {
      //
    });

  };


  $scope.init();

});
