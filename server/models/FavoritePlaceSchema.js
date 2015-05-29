var mongoose = require('mongoose')

var FavoritePlaceSchema = new mongoose.Schema({
  name: {
    type: String
  },
  address: {
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
  },
  reviews: {
    type: [{
      message: String,
      date: Date,
      friends: Boolean,
      Public: Boolean,
      Self: Boolean,

    }]
  },
  coordinates: {
    type: Number
  },
  Interests: {
    tags: {
      type: [String],
      index: true
    }
  },
  publicReviews: {
    type: String
  },
  numberFavorited: {
    type: Number
  },
  img: {
    type: String
  }
})


module.exports = mongoose.model("FavoritePlace", FavoritePlaceSchema)
