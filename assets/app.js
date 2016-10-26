angular.module('app', [
	'ngRoute'
]); // setter - called only once before getters
// application controller
angular.module('app') // getter
.controller('ApplicationCtrl', function ($scope, UserSvc) {

    /*if (!$scope.isAuth){
        $location.path('/login');
    } else {
        $location.path('/');
    }*/

	$scope.$on('login', function (_, user) { // receives $emit; _=ignore this binding/parameter
		$scope.currentUser = user;
		$scope.isAuth = true;
	});
	
	$scope.logout = function(){
        $scope.currentUser = null;
        //$location.path('/login');
        UserSvc.removeToken();
        $scope.isAuth = false;
    }
});
angular.module('app')
.controller('BidsCtrl', function ($scope, BidsSvc) {
	
  $scope.highbid = 0;
  
  $scope.postBid = function () {
    if ($scope.bidPrice) {
      BidsSvc.create({
        username: 'bernie',
        price:     $scope.bidPrice
      })
      .success(function (bid) {
        $scope.bids.unshift(bid);
        $scope.bidPrice = null;
      })
    }
  }
  
  BidsSvc.fetch()
  .success(function (bids) {
    $scope.bids = bids;
	var currmax = $scope.highbid === "undefined" ? 0 : $scope.highbid;
	//console.log('xxx: ' + $scope.highbid);
	bids.forEach( function (currentval)  {
		if(currentval.price > currmax) currmax = currentval.price;
		//console.log(currmax + ' : cval ' + currentval.price);
	});
	$scope.highbid = currmax;
  });
});
angular.module('app')
.service('BidsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/bids');
  }
  this.create = function (bid) {
    return $http.post('/api/bids', bid);
  }
});
// login controller
angular.module('app')
.controller('LoginCtrl', function ($scope, UserSvc) {
	
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (response) {
		//console.log(user);
		$scope.$emit('login', response.data); // pass event up to to ApplicationCtrl
		//$location.path('/');
    });
  }
});
// register user controller
angular.module('app')
.controller('RegisterCtrl', function ($scope, UserSvc) {
  $scope.register = function (username, password) {
    UserSvc.register(username, password) // call register in UserSvc service
    .then(function (response) {
		$scope.$emit('login', response.data); // pass event up to to ApplicationCtrl
    });
  }
});
angular.module('app') // getter
.config(function ($routeProvider) {
  $routeProvider 	// each route has a controller and a template associated with it
  .when('/',         { controller: 'BidsCtrl', templateUrl: '/templates/bids.html' })  // html-files are loaded on demand
  .when('/register', { controller: 'RegisterCtrl', templateUrl: '/templates/register.html' })
  .when('/login',    { controller: 'LoginCtrl', templateUrl: '/templates/login.html' })
});
angular.module('app')
.service('UserSvc', function ($http) {
  var svc = this;
  
  svc.getUser = function () {
    return $http.get('/api/users'); // get the logged-in users information
  }
  
  svc.login = function (username, password) {
    return $http.post('/api/sessions', { // get a JWT coming back from the sessions/post
      username: username, password: password
	}).then(function (val) {
	  svc.token = val.data;
	  $http.defaults.headers.common['X-Auth'] = val.data;
      return svc.getUser();
    });
  }
  
  svc.register = function (username, password) {
	return $http.post('/api/users', { // create a user
		username: username, password: password
	}).then(function () {
		return svc.login(username, password);
	});
  }
  
  svc.removeToken = function () {
	$http.defaults.headers.common['X-Auth'] = "";
  }
});