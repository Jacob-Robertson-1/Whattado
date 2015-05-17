var app = angular.module("whattado")

app.controller("mainControl", function() {

  $scope.getParseData = function() {
    parseService.getData().then(function(response) {
        $scope.messages = response.data.results;
        console.log(response);
      },
      function(err) {
        console.log(err)
      })
  };

  $scope.getParseData();
  $scope.postData = function() {
    mainService.postData($scope.firstName)
    mainService.postData($scope.lastName)
    $scope.message = '';
  };

});
