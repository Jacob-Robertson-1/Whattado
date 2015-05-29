var app = angular.module("myapp");

app.service('loginService', function($http, $q) {

  this.currentUserToken = -1;
  var self = this;

  this.login = function(email, password) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/users/auth',
      data: {
        email: email,
        password: password
      }
    }).then(function(res) {
      deferred.resolve(res.data);
    }).catch(function(res) {
      deferred.reject(res.data);
    });
    return deferred.promise;
  };


  this.loginTwo = function(userName) {
    return $http({
      method: "GET",
      url: '/api/login/' + userName,
    }).then(function(response) {
      self.currentUserToken = response.data._id;
    });
  }

  return this;
});
