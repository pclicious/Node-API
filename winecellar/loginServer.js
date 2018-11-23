var express = require('express');
var http = require('http');
var os = require('os');
 os.tmpDir = os.tmpdir;
    login = require('../routes/login');
	var bodyParser = require('body-parser')
	var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
	app.use(bodyParser.urlencoded({
  extended: true
}));
	app.use(express.bodyParser());
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	
	 /* res.setTimeout(60000, function() {
          res.send(408);
        }); */

    // Pass to next layer of middleware
    next();
}); 

app.post('/login', function(req,res){
	login.authenticate
});

http.createServer(app).listen(8080);

console.log('Listening(HTTP) on port 8080...');