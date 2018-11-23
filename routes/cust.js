var mongo = require('mongodb');
var MongoClient = require("mongodb").MongoClient;
var autoIncrement = require("mongodb-autoincrement");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('EmpExpense', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'EmpExpense' database");
        db.collection('EmpExpenseData', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'EmpExpenseData' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});


exports.findBySSN = function(req, res) {
    var SSN = req.params.SSN;
	var query = {SSN: SSN}
    console.log('Retrieving SSN: ' + SSN);
    db.collection('EmpExpenseData', function(err, collection) {
      collection.find(query).limit(1).next(function(err, item) {
		 // collection.find(query),function(err,item){
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('EmpExpenseData', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addSSN = function(req, res) {
    var wine = req.body;
	console.log(wine);
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('EmpExpenseData', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(wine));
                res.send(result[0]);
            }
        });
    }); 
}

exports.updateSSN = function(req, res) {
    var SSN = req.params.SSN;
    var wine = req.body;
    console.log('Updating wine: ' + SSN);
    console.log(JSON.stringify(wine));
    db.collection('EmpExpenseData', function(err, collection) {
        collection.update({'SSN':SSN}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteSSN = function(req, res) {
    var SSN = req.params.SSN;
    console.log('Deleting wine: ' + SSN);
    db.collection('EmpExpenseData', function(err, collection) {
        collection.remove({'SSN':SSN}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

