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