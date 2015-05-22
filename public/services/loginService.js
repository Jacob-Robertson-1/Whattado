var app = angular.module("myapp");

app.factory('loginService', function($http) {
  return {
    login: function(user) {
      var $promise = $http.post("/api/users", user);
      $promise.then(function(email, password) {
        if (email.data == true && password.data == true) {
          console.log("your logged in")
        }
      })
    }
  }




});
