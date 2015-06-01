var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema;
var q = require('q');



var userFriendSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  friendFirstName: {
    type: String
  },
  friendLastName: {
    type: String
  },

})


module.exports = userFriendSchema;
