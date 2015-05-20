var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true
  },
  firstName: {
    type: String,
    lowercase: true
  },
  lastName: {
    type: String,
    lowercase: true
  },
  displayName: {
    type: String
  },
  age: {
    type: Number
  },
  location: {
    type: String
  },
  provider: {
    type: String
  }
})
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(12, function(err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePw = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) return cb(err, null);
    else cb(null, res);
  })
}
module.exports = mongoose.model("User", userSchema)
