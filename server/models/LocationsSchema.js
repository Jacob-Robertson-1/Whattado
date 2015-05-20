var mongoose require('mongoose')

var FavoriteSchema = new mongoose.Schema({
  FavoriteLocatonName: {}
  displayName: {
    type: String,
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
  reviews: {
    type: String
  },
  coordinates: {
    type: Number
  },
  Interests: {
    type: String
  },
  publicReviews: {
    type: String
  }
})


module.exports = mongoose.model("FavoritePlaces", userSchema)
