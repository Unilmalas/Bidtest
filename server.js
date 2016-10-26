var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(require('./auth')); // use the middleware
app.use('/api/bids', require('./controllers/api/bids'));
app.use( require('./controllers/static'));
app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/users', require('./controllers/api/users'));

var server = app.listen(3000, function () {
  console.log('server listening on %d', server.address().port);
});