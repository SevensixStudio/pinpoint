//import Express library
const express = require('express'); //common JS modules 
//ES2015 modules imported this way:
// import express from 'express';
//but Node does not yet support this
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser'); //middleware, needs to be wired up using app.user

require('./models/User');
require('./services/passport');

//connect to mongodb
mongoose.connect(keys.mongoURI);

//generate new express application - can have mutliple express apps in one project
const app = express();

//wire up body-parse middleware
//bodyParser will parse the body and assign it to the req.body body of the incoming request object from post, put, patch requests 

app.use(bodyParser.json());

//app.use is used to wire up middlewares -- small functions that used to modify incoming requests before they are sent to route handlers
//tells express that we are going to make use of cookies inside of our app
app.use(
    cookieSession({ //pass in configuration object
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms - how long this cookie can live inside of the browser before it is automatically expired
        keys: [keys.cookieKey] //key used to encrypt cookie -- so that people cannot manually change user id and fake being someelse inside the app
    })
    //cookie session extracts that data and assigns it to req.session
    //passport is now looking at req.session and pulls that relevant data out of there and sends it along to deserialize user, etc
);

//tell passport that it should make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//no need to save authroutes to a variable so just call it here
//authroutes returns function which requires 'app' as a variable
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


//dynamic port binding
//Heroku injects environment variables at runtime
//Heroku passes us runtime configuration that it can only tell us after we have deployed the application
//process.env.PORT grabs the port from the underlying environment
//in a development environment process.env.PORT might not be defined yet so 5000 is the default port for development
const PORT = process.env.PORT || 5000;
//tells epxress to tell Node that it want's to listen to requests on port defined above
app.listen(PORT);