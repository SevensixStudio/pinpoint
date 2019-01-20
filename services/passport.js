const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

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