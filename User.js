var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  password: String
});
mongoose.model('Login', UserSchema);
module.exports = mongoose.model('User');