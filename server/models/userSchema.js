var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema;
var q = require('q');

var userFriend = require('./userFriendSchema');

var userSchema = new Schema({
  /*facebookId: {
  type: String,
  unique: true
},
*/
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  location: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  username: {
    type: String,
    sparse: true
  },
  password: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  member: {
    type: Boolean,
    default: true
  },
  bio: {
    type: String
  },
  facebookProfilePic: {
    type: String
  },
  birthday: {
    type: String
  },
  tags: {
    type: String
  },
  updated: {
    type: Date,
    default: Date.now
  },
  friends: {
    myfriends: [{
        /// check to see if i can store names
        type: userFriend
      }]
      //[userFriendSchema]  http://mongoosejs.com/docs/schematypes.html
  },
  reviews: {
    myReviews: [{
      type: Schema.Types.ObjectId,
      ref: 'favoritePlace'
    }]
  },
  wantToTry: {
    myWantToTry: [{
      type: Schema.Types.ObjectId,
      ref: 'favoritePlace'
    }]
  },
  favorites: {
    myFavorites: [{
      type: Schema.Types.ObjectId,
      ref: 'favoritePlace'

    }]
  }
});

/*userSchema.pre('save', function(next) {
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
}*/
module.exports = mongoose.model("User", userSchema)
