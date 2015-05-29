var app = angular.module("myapp");


app.service("userService", function($http, $q) {

  /*  this.loggedInUser = function(email) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/users/',
        data: {
          email: email
        }
      }).then(function(res) {
        deferred.resolve(res.data);
      }).catch(function(res) {
        deferred.reject(res.data);
      });
      return deferred.promise;
    };

  */
  this.getUserData = function(userId) {
    var dfd = $q.defer();
    // console.log("userObj", userObj);
    $http({
      method: "GET",
      url: '/api/users/' + userId,
    }).then(function(response) {
      // console.log('response434', response);
      if (!response.data) {
        dfd.resolve(false);
      } else {
        return dfd.resolve(response.data);
      }
    }); // End .then
    return dfd.promise;
  }; // 

  this.addFriend = function(FriendId) {
    var url = '/api/users/:userId';

    return $http({
      method: 'POST',
      url: url,
      data: User
    });
  };

  this.addFavorite = function(place) {
    console.log(place);
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/users/me/favorites/myfavorites',
      data: {
        _id: place
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.addWantToTry = function(place) {
    console.log(place);
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/users/me/wantToTry/myWantToTry',
      data: {
        _id: place
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };


});
