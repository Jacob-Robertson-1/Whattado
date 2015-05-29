var app = angular.module("myapp")

app.controller("loginControl", function($scope, $location, loginService) {


  $scope.clickLogin = function() {

    /*loginService.login($scope.email, $scope.password).then(function() {
  $location.path('/landing');

}).catch(function(err) {
  $scope.error = err;
});;
*/
    loginService.loginTwo("J Rob").then(function() {
      $location.path('/landing');

    })
  };
});
