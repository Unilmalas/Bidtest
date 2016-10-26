// API for bids-endpoint
var Bid = require('../../models/bid');
var router = require('express').Router();

router.get('/', function (req, res, next) { // get endpoint: note namespace (.use in server.js)
  Bid.find()
  .sort('-date')
  .exec(function (err, bids) {
    if (err) { return next(err); }
    res.json(bids);
  });
});

router.post('/', function (req, res, next) { // bid endpoint: note namespace (.use in server.js)
	var bid = new Bid({price:     req.body.price});
	bid.username = req.auth.username;
	// check for a higher bid on the db: if there is one we do not save
	//console.log('bidprice: ' + bid.price);
	Bid.find({ "price": { $gte: bid.price }})
	.sort('-date')
	.limit(1) // findOne is deprecated
	.exec(function (err, highestbid) {
		if (err) { return next(err); }
		if (Object.keys(highestbid).length != 0) { // we have a result
			// there is a higher bid
			// console.log("not the highest bid: " + Object.keys(highestbid).length); // todo: make this a message on the bid screen
		} else { // no result
			bid.save(function (err, bid) {
				if (err) { return next(err); }
				res.status(201).json(bid);
			});
		}
	});
});

module.exports = router;