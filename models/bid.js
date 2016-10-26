var db = require('../db')
var Bid = db.model('Bid', {
  username: { type: String, required: true },
  price:     { type: Number, required: true },
  date:     { type: Date,   required: true, default: Date.now }
});

module.exports = Bid;
