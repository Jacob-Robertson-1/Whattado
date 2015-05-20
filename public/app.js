var app = angular.module("myapp", ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/views/home.html",
      controller: "mainControl"
    })
    .state("login", {
      url: '/login',
      templateUrl: "/views/login.html",
      controller: "loginControl"
    })
    .state("landing", {
      url: '/landing',
      templateUrl: '/views/landing.html',
      controller: "landingControl"
    })
    .state("profile", {
      url: '/user',
      templateUrl: "/views/user.html",
      controller: "userControl"
    })


});
