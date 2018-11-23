var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

    cust = require('../routes/cust');
	var bodyParser = require('body-parser')
	var app = express();
	
var options = {
  key: fs.readFileSync('privateKey.pem'),
  cert: fs.readFileSync('certificate.pem')
};

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
	app.use(bodyParser.urlencoded({
  extended: true
}));
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

    // Pass to next layer of middleware
    next();
}); 

app.get('/cust', cust.findAll);
app.get('/cust/:SSN', cust.findBySSN);
app.post('/cust', cust.addSSN);
app.put('/cust/:SSN', cust.updateSSN);
app.delete('/cust/:SSN', cust.deleteSSN);

app.get("/",function(req,res){
res.send('Welcome to app');	
});

http.createServer(app).listen(3002);
https.createServer(options, app).listen(3004);

console.log('Listening(HTTP) on port 3002...');
console.log('Listening(HTTPS) on port 3004...');