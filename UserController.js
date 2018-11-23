var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');
module.exports = router;

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

router.post('/login',function(req,res){
	/* var User = req.app; */
     var username = req.body.username;
     var password = req.body.password;
	  if (username.length > 0 && password.length > 0) {
                User.find({username: username, password: password}, function (err, user) {
                    if (err) {
                        res.json({status: 0, message: err});
                    }
                    if (!user) {
                        res.json({status: 0, message: "not found"});
                    }
                    res.json({status: 1, id: user._id, message: " success"});
                })
            } else {
                res.json({status: 0, msg: "Invalid Fields"});
            }
});