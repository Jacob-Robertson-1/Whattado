var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  }
  firstName: {
    type: String
  }
  lastName: {
    type: String
  }
  age: {
    type: Number
  }
  streetAddress: {
    type: String
  }
  city: {
    type: String
  }
  state: {
    type: String
  }
  country: {
    type: String
  }
  zipcode: {
    type: String
  }
})


module.exports(mongoose.model("User", userSchema))
