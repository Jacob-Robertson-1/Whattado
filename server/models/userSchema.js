var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
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
  age: {
    type: Number
  },
  streetAddress: {
    type: String,
    lowercase: true
  },
  city: {
    type: String,
    lowercase: true
  },
  state: {
    type: String,
    lowercase: true
  },
  country: {
    type: String,
    lowercase: true
  },
  zipcode: {
    type: String,
    lowercase: true
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
