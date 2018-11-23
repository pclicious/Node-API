var app = require('./app');
var http = require('http');
var port = process.env.PORT || 3000;
var server = http.createServer(function(req,res) {
  console.log('Express server listening on port ' + port);
});

server.listen(port,'localhost')