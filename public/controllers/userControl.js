var app = angular.module("myapp")

app.controller("userControl", function($scope, mainService, userService) {

  $scope.addFavorite = function(place) {
    console.log(place);
    userService.addFavorite(place).then(function() {

      //
    });
  };

  $scope.removeFavorite = function(index) {
    user.favorites.myfavorites.data.splice(index, 1);
  }

  $scope.newFriend = {};

  $scope.addUser = function() {
    mainService.addFriend($scope.newFriend);
    $scope.newFriend = {};
  }

});
