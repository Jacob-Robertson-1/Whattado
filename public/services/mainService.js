var app = angular.module("myapp");


app.service("mainService", function($http, $q) {

  this.getPlaces = function() {

    var url = '/api/favoritePlace';
    return $http({
      method: 'GET',
      url: url
    }).then(function(response) {
      return response.data;
    });
  };

  this.getMyWantToTryPlaces = function() {

    var url = '/api/users/:CurrentUserId/wantToTry/myWantToTry';
    return $http({
      method: 'GET',
      url: url
    }).then(function(response) {
      return response.data;
    });
  };


  this.addPlace = function(Place) {
    var url = '/api/favoritePlace';
    return $http({
      method: 'POST',
      url: url,
      data: Place
    });
  };


  this.getUsers = function() {

    var url = '/api/users';
    return $http({
      method: 'GET',
      url: url
    }).then(function(response) {
      return response.data;
    });
  };


  this.addUser = function(User) {
    var url = '/api/users';

    return $http({
      method: 'POST',
      url: url,
      data: User
    });
  };

  this.addFriend = function(friendId, userId) {
    var url = '/api/User/$CurrentUserId/Friends/$FriendId';

    var newUrl = url.replace("$CurrentUserId", userId).replace("$FriendId", friendId);

    return $http({
      method: 'PUT',
      url: newUrl
    });
  };


  this.addfavorites = function(User) {
    var url = '/api/users/:userId/favorites/myfavorites';
    return $http({
      method: "POST",
      url: url,
      data: User
    })
  };
});
