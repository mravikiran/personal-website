var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var Schema = mongoose.Schema;

var UserSchema = new Schema ({
                                email : {type:String, required: true, unique:true},
                                name : String,
                                hash : String,
                                salt : String
        });

UserSchema.methods.SetPassword = function(password) {

    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.ValidPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash == hash;

}

UserSchema.methods.GenerateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "STORE_IT_IN_ENV_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


module.exports = mongoose.model('Users', UserSchema, 'Users');
