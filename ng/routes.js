angular.module('app') // getter
.config(function ($routeProvider) {
  $routeProvider 	// each route has a controller and a template associated with it
  .when('/',         { controller: 'BidsCtrl', templateUrl: '/templates/bids.html' })  // html-files are loaded on demand
  .when('/register', { controller: 'RegisterCtrl', templateUrl: '/templates/register.html' })
  .when('/login',    { controller: 'LoginCtrl', templateUrl: '/templates/login.html' })
});