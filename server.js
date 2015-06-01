var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var cookies = require('cookie-parser');


//controllers // schema's
//require user model
var User = require('./server/models/userSchema');
var FavoritePlace = require("./server/models/FavoritePlaceSchema");
var UserFriend = require("./server/models/userFriendSchema");

//express

var app = express();


/*var FACEBOOK_APP_ID = "1583332741919313"
var FACEBOOK_APP_SECRET = "0d8bc6297640d15557ee0e4834016f02"
*/

//middleware
var requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else res.redirect('views/login.html')
}

//Server Variables
var currentUser = 0;

/*app.use(session({
  secret: "aoweiry98n1sr71ADRB3awe3",
  saveUnitialized: false,
  resolve: true

}));

app.use(passport.initialize());
app.use(passport.session());
*/

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(cors());
app.use(cookies());




/*
//pasport
passport.serializeUser(function(user, done) {
  return (null, user);
})

passport.deserializeUser(function(obj, done) {
  return (null, obj);
});

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ["id", 'age_range', 'email', 'gender', 'first_name', "last_name", 'location', 'picture'],
  enableProof: false
}, function(token, refreshToken, profile, done) {
  //console.log("profile", profile);
  User.findOneAndUpdate({
      'facebook.id': profile.id
    }, {
      upsert: true
    },

    function(err, user) {
      if (err) {
        return done(err);
      }
      //No user was found... so create a new user with values from Facebook (all the profile. stuff)

      user = new User({
        id: profile.id,
        email: profile.email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        gender: profile.gender,
        displayName: profile.displayName,
        location: profile.location,
        picture: profile.picture,
        username: profile.username,
        provider: 'facebook',
        //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
        facebook: profile._json
      });
      user.save(function(err, user) {
        console.log(profile);
        if (err) {
          console.log(err)
        };
        console.log("calling done", user)
        done(null, user);
      });
    })
}));


*/


// Facebook end points

// test points
app.get('/api', function(req, res) { // testing to if server works
  res.send('hello')
})

app.get('/api/confirm/success', function(req, res) {
  res.send('Success')
})

app.get('/api/confirm/failure', function(req, res) {
  res.send('you failed')
})


/*// SOCIAL OAUTH
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/#/login',
    successRedirect: '/#/landing'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('got to success')
    res.redirect('#/landing');
  });
// LOGOUT
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  console.log("You've logged out");
});

*/

// schema endpoints


//posts

/*Creates a new user*/
app.post('/api/users', function(req, res) {
  var user = new User(req.body);
  user.save(function(err, new_user) {
    if (err) {
      console.log("can't add user", err)
    }
    res.json(new_user);
  });
});

/*Creating a place*/ //RENAME to favoritePlace and refactor
app.post("/api/favoritePlace", function(req, res) {
  var place = new FavoritePlace(req.body);
  place.save(function(err, new_place) {
    if (err) {
      console.log('cant create FavoritePlace', err)
    }
    res.json(new_place)
  })
});

function existsInArrayById(array, objectId) {
  var exists = false;
  for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
    //console.log(id);
    if (objectId.id === array[i].id) {
      exists = true;
    } else {
      exists = false;
    }
  };
  return exists;
};

/* adds a new place to the userID*/ //RENAME to favoritePlace and refactor
app.post('/api/users/me/favorites/myfavorites', function(req, res) {
  FavoritePlace.findOne({
    _id: req.body._id
  }).exec().then(function(place) {
    if (!place) {
      return res.status(404).end();
    }
    User.findOne({
      _id: "556b8086ff6cc8741b4e5229" //req.params.userId
    }).exec().then(function(user) {
      var favorites = user.favorites.myFavorites;
      var exists = existsInArrayById(favorites, place._id);
      console.log(exists);

      if (!exists) {

        console.log(user);
        favorites.push(place._id);
        user.save(function(err) {
          if (err) {
            console.log("cant add this place", err);
          }
          res.json(user);
        })
      }
    })
  });
});


/*adds a place to your Want to try list*/
app.post('/api/users/me/wantToTry/myWantToTry', function(req, res) {
  FavoritePlace.findOne({
    _id: req.body._id
  }).exec().then(function(place) {
    if (!place) {
      return res.status(404).end();
    }
    User.findOne({
      _id: "556b8086ff6cc8741b4e5229" //req.params.userId
    }).exec().then(function(user) {
      console.log(user);
      var wantToTry = user.wantToTry.myWantToTry;
      var exists = existsInArrayById(wantToTry, place._id);
      console.log(exists);
      if (!exists) {
        wantToTry.push(place._id);
        user.save(function(err) {
          if (err) {
            console.log("cant add this place", err);
          }
          res.json(user);
        });
      }
    });
  });
});

// move a place from your wantToTry to your Favorites
app.put('/api/users/:CurrentUserId/favorites/myfavorites/moveTo', function(req, res) {
  FavoritePlace.findOne({
    _id: req.body._id
  }).exec().then(function(place) {
    if (!place) {
      return res.status(404).end();
    }
    User.findOne({
      _id: req.params.CurrentUserId
    }).exec().then(function(currentUser) {
      console.log(user);
      var wantToTry = currentUser.wantToTry.myWantToTry;
      var favorites = currentUser.favorites.myfavorites;
      var existsfavorites = existsInArrayById(favorites, place._id);
      console.log(exists);
      if (!exists) {
        //favorites.push(place._id);
        Array.prototype.move = function(wantToTry, favorites) {
          place.splice(favorites, 0, place.splice(wantToTry, 1)[0]);
        };
        currentUser.save(function(err) {
          if (err) {
            console.log("cant add this place", err);
          }
          res.json(currentUser);
        });
      }
    });
  });
});

// adds a place to your favorites
app.post('/api/users/me/favorites/myfavorites', function(req, res) {
  FavoritePlace.findOne({
    _id: req.body._id
  }).exec().then(function(place) {
    if (!place) {
      return res.status(404).end();
    }
    User.findOne({
      _id: "556b8086ff6cc8741b4e5229" //req.params.userId
    }).exec().then(function(user) {
      var favorites = user.favorites.myFavorites;
      var exists = existsInArrayById(favorites, place._id);
      console.log(exists);

      if (!exists) {

        console.log(user);
        favorites.push(place._id);
        user.save(function(err) {
          if (err) {
            console.log("cant add this place", err);
          }
          res.json(user);
        })
      }
    })
  });
});

// adds a new friend to your UserID
app.put('/api/User/:CurrentUserId/Friends/:FriendId', function(req, res) {
  console.log("req.params:", req.params.FriendId);
  User.findOne({
    _id: req.params.FriendId
  }).exec().then(function(friend) {
    //console.log(user);
    if (!friend) {
      return res.status(404).end();
    }
    User.findOne({
      _id: req.params.CurrentUserId
    }).exec().then(function(currentuser) {
      var myfriends = currentuser.friends.myfriends;
      var exists = existsInArrayById(myfriends, currentuser._id);
      //console.log(currentuser)
      if (!exists) {
        var newFriend =(
            {
              userid: friend._doc._id,
              friendFirstName: friend._doc.firstName,
              friendLastName: friend._doc.lastName
            });
        try {
          myfriends.push(newFriend);
        } catch(ex){
          var str = ex;
        }
        console.log(newFriend);
        currentuser.save(function (err) {
          if (err) {
            console.log("cant add this place", err);
          }
          res.json(currentuser);
        });
      }
    });
  });
});

app.post('/api/users/me/favorite_places', requireAuth, function(req, res) {
  //grab the place
  Place.findOne({
    _id: req.body._id
  }).exec().then(function(place) {
    if (!place) {
      return res.status(404).end();
    }
    //update the user with the favorite_place
    User.findOne({
      _id: req.user._id
    }).exec().then(function(user) {
      user.favorite_places.push(place);
      user.save(function(err) {
        if (err) {
          console.log("can't add place to user");
        }
        return res.json(user);
      });
    });
  });
});

//get

/*gets the users Places*/
app.get('/api/users', function(req, res) {
  User.find().populate('favorites').exec().then(function(err, users) {
    return res.json(users);
  });
})

app.get("/api/users", function(req, res) {
  User.find(function(err, users) {
    res.send(users);
  });
})

app.get("/api/users/:userId", function(req, res) {
  var uId = req.params.userId;
  User.findOne({
    '_id': uId
  }, function(err, user) {
    console.log(user);
    res.send(user);
  });
})

app.get("/api/login/:username", function(req, res) {
  var uName = req.params.username;
  User.findOne({
    'username': uName
  }, '_id', function(err, id) {
    res.send(id);
  });
})

app.get('/api/users/me', requireAuth, function(req, res) {
  User
    .findOne({
      _id: req.user.id
    })
    .populate('favorite_places')
    .exec().then(function(user) {
      return res.json(user);
    });
});


//facebook
/*
app.get('/api/users/userId', requireAuth, function(req, res) {
  User.findOne({
    facebookId: req.user.id
  }, function(err, user) {
    if (err) {
      res.send("There was an error");
    } else {
      res.json(user);
    }
  })
});*/


User.find({
  _id: req.params.CurrentUserId
}).then(function(err, myWantToTry) {
  res.send(user);
})


/*gets all the Places*/
app.get("/api/favoritePlace", function(req, res) {
  FavoritePlace.find(function(err, places) {
    res.send(places);
  });
});

/*gets all the users Want To try*/
app.get("/api/users/:CurrentUserId/wantToTry/myWantToTry", function(req, res) {
  FavoritePlace.find(function(err, places) {
    res.send(places);
  });

});




//delete

/*Deletes a User*/
app.delete('/api/users/userId', function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err) {
    if (err) {
      console.log('cant delete user', err)
    }
    res.status(200).end();
  })
})

// removes a place from your favorites
app.delete('/api/users/favorites/:myfavoritesId', function(req, res) {
  Place.remove({
    _id: req.params.placeId
  }, function(err) {
    if (err) {
      console.log("can't delete place", err);
    }
    res.status(200).end();
  });
});


//put
//Changes something on a favorite place
app.put("/api/favoriteplaces/:placeId", function(req, res) {
  Place.update(req.body, function(err) {
    if (err) {
      console.log("can't update place", err)
    }
  });
});



//connection

var port = 3000
var mongoUri = "mongodb://localhost:27017/Whattado";

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at', mongoUri);
});




app.listen(port, function() {
  console.log("listening to port: ", port);
});
