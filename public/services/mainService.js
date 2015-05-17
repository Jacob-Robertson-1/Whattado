var app = angular.module("whattado");


app.service("mainService", function() {


this.postData = function(yourName) {
  return $http({
    method: 'POST',
    url: 'mongodb://localhost:27017/Whattado',
    data: {
      FirstName: "",
      lastName: ""
    }
  })
}

this.getData = function() {
  return $http({
    method: 'GET',
    url: 'mongodb://localhost:27017/Whattado'
  });
}

});


});
