var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  }
  firstName: {
    type: String,
    lowercase: true
  }
  lastName: {
    type: String,
    lowercase: true
  }
  age: {
    type: Number
  }
  streetAddress: {
    type: String,
    lowercase: true
  }
  city: {
    type: String,
    lowercase: true
  }
  state: {
    type: String,
    lowercase: true
  }
  country: {
    type: String,
    lowercase: true
  }
  zipcode: {
    type: String,
    lowercase: true
  }
})

module.exports(mongoose.model("User", userSchema))
