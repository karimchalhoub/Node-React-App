const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //app object represents the underlying running express server

//app.use are wrapping middleware inside the app
//instead of writing code for every route, automatically uses middleware for all
//middleware runs before routes
//difference between cookie-session and another middleware, express-session,
//is that with former, you can only store 4KB of data in cookie, whereas the latter,
//stores a reference to session id and you can store many more data points about session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
// get http method is for getting info
// post http method is for sending info
// put http method is for update all properties of something
// delete http method is for deleting info
// patch http method is for update one or two properties of something
//req represents the incoming request from client / res is response from server

require('./routes/authRoutes')(app);

// Environment variable that is running in underlying runtime
const PORT = process.env.PORT || 5000;
app.listen(PORT);
