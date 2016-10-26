var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/bidtst', function () {
  console.log('mongodb connected')
})
module.exports = mongoose
