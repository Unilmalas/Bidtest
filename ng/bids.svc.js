angular.module('app')
.service('BidsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/bids');
  }
  this.create = function (bid) {
    return $http.post('/api/bids', bid);
  }
});