var app = angular.module("myapp")

app.controller("landingControl", ["$scope", "mainService", "userService", "loginService", function($scope, mainService, userService, loginService) {

  $scope.init = function() {
    mainService.getPlaces().then(function(results) {
      $scope.places = results;
    });
  }
  $scope.initialize = function() {
    $scope.isValidUser = loginService.currentUserToken != -1;
    if ($scope.isValidUser) {
      userService.getUserData(loginService.currentUserToken).then(function(result) {
        $scope.currentUser = result;
        $scope.friends = result.friends.myfriends;
      });
    }
  }

  $scope.addFavorite = function(place) {
    userService.addFavorite(place).then(function() {
      //
    });

  };

  $scope.addWantToTry = function(place) {
    userService.addWantToTry(place).then(function() {
      //
    });

  };




  /*userService.getUserData().then(function(result) {
    console.log('Ctrl_result', result);
    $scope.showUserData = result;
  });*/

  $scope.init();
  $scope.initialize();
}]);
