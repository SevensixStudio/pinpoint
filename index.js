//import Express library
const express = require('express'); //common JS modules 
//ES2015 modules imported this way:
// import express from 'express';
//but Node does not yet support this
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./services/passport');

//connect to mongodb
mongoose.connect(keys.mongoURI);

//generate new express application - can have mutliple express apps in one project
const app = express();

//no need to save authroutes to a variable so just call it here
//authroutes returns function which requires 'app' as a variable
require('./routes/authRoutes')(app);


//dynamic port binding
//Heroku injects environment variables at runtime
//Heroku passes us runtime configuration that it can only tell us after we have deployed the application
//process.env.PORT grabs the port from the underlying environment
//in a development environment process.env.PORT might not be defined yet so 5000 is the default port for development
const PORT = process.env.PORT || 5000;
//tells epxress to tell Node that it want's to listen to requests on port defined above
app.listen(PORT);