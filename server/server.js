var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').FacebookStrategy
var bodyParser = require('body-parser');
var cors = require('cors')


//controllers // schema's


//express

var app = express();



//middleware
var requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else res.redirect('public/views/login.html')
}

app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: "aoweiry98n1sr71ADRB3awe3",
  saveUnitialized: false,
  resolve: true
}));

app.use(express.static(__dirname + "/public"))
app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
  clientID: "618772378257479"
  clientSecret: "bf22575c973bfa120357f91bc7ab26cf"
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function(token, refreshToken, profile, done) {
  return (done, profile)
}));

passport.serializeUser(function(user, done) {
  return (null, user);
})

passport.deserializeUser(function(obj, done) {
  return null, obj
});



// Facebook end points


app.get('/', function(req, res) { // testing to if server works
  res.send('hello')
})

app.get('/confirm/success', function(req, res) {
  res.send('Success')
})

app.get('/confirm/failure', function(req, res) {
  res.send('you failed')
})

app.get('/auth/facebook', passport.authenticate('facebook', {

  scope: ['email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: "/confirm/success",
  failureRedirect: "/confirm/failure"
}))
app.get('/', requireAuth, function(req, res) {
  return (res.sendFile(__dirname + "public/views/landing.html"))
})
app.get('/me', function(req, res) {
  res.send(req.user);
})


// schema endpoints




//connection

var port = 3000
var mongoUri = "mongodb://localhost:27017/mini-birds-mongoose";

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at', mongoUri);
});




app.listen(port, function() {
  console.log("listening to port: ", port);
});
