//import Express library
const express = require('express'); //common JS modules 
//ES2015 modules imported this way:
// import express from 'express';
//but Node does not yet support this
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

//generate new express application - can have mutliple express apps in one project
const app = express();

//new GoogleStrategy() creates new instance of Google passport strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //this will be the route that the user is sent to after they grant permission to our app
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        //create new user inside DB with the user information recieved
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile:', profile);
    })
);

//route handler                              //strategy name
app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] //specifies to google what data we want from the user
    })
);

//google triggers this callback which in turn takes the code and sends it over to the google strategy to get the actual information for the user
app.get('/auth/google/callback', passport.authenticate('google'));

//TEST ROUTE
//app -- running express server which has some number of route handlers associated with it
//.get() -- creates brand new route handler that watches for requests with the 'get' method
//Express methods: get (info), post (send), put (update), delete, patch (update 1 or 2 props)
// '/' --  route handler
// 'req' -- request - contains data about who is making the request
// 'res -- response - represents outgoing response
// app.get('/',  (req, res) => {
//     res.send({ hello: 'world' });
// });

//dynamic port binding
//Heroku injects environment variables at runtime
//Heroku passes us runtime configuration that it can only tell us after we have deployed the application
//process.env.PORT grabs the port from the underlying environment
//in a development environment process.env.PORT might not be defined yet so 5000 is the default port for development
const PORT = process.env.PORT || 5000;

//tells epxress to tell Node that it want's to listen to requests on port defined above
app.listen(PORT);