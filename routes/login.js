var mongo = require('mongodb');
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");


var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
	
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('LoginDB', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'LoginDB' database");
        db.collection('Login', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'Login' collection doesn't exist.");
            }
        });
    }
});

var db_schema = new mongoose.Schema({
                username: {type: String, required: true, unique: true},
                password: {type: String, required: true, unique: true},
            });
			
var login_db = mongoose.model('LoginDB', db_schema);
        return function (req, res, next) {
                req.app = login_db;
                next();
            };

exports.authenticate = function(req, res) {
	var credent = req.body;
	console.log(JSON.stringify(credent));
     var username = credent.Username;
     var password = credent.Password;
	 console.log(username);
	 console.log(password);
	  if (username.length > 0 && password.length > 0) {
		  console.log("validating");
		  db.collection('LoginDB', function(err, collection) {
			  console.log("finding");
        collection.find({username:username,password:password}).limit(1).next(function(err, items) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(credent));
                res.send(items[0]);
            }
        })
    })
            } else {
                res.json({status: 0, msg: "Invalid Fields"});
            }
}