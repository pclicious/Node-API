var mongo = require('mongodb');
var MongoClient = require("mongodb").MongoClient;

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


exports.authenticate = function(req,res){
	var isAdmin = false;
	isLoginSuccessful = false;
	var credentials = req.body;
	var query = {username:credentials.Username,password:credentials.Password}
	db.collection('Login', function(err, collection) {
	collection.find(query).limit(1).next(function(err, item) {
		if(err){
			console.log("error has occured")
		}if(item){
			isLoginSuccessful = true;
			if(item.isAdmin == true){
				isAdmin = true;
			}
		}	if(!item){
			isLoginSuccessful = false;
			isAdmin = false;
		}
		res.send(JSON.stringify('isLoginSuccessful:'+isLoginSuccessful + ',isAdmin:'+isAdmin));
	});
    }); 
}