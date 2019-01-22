const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//need to add it users in slightly different way to avoid issues when testing
const User = mongoose.model('users'); //fetches users from mongoose

//'user' will be the user just created in the database
passport.serializeUser((user, done) => {
    done(null, user.id); //id here refers to MongoDB id, not googleId
    //user.id is then 'stuffed' into the user's browser cookie
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

//new GoogleStrategy() creates new instance of Google passport strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //this will be the route that the user is sent to after they grant permission to our app
        callbackURL: '/auth/google/callback', //relative path -- 
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        
        //findOne will return a model instance of the existing user if one exists
        const existingUser = await User.findOne({ googleId: profile.id });        
        if (existingUser) {
            //already have a record with the given profile id
                //first arg is an error object --in this scenario we found a user so there are no errors
           return done(null, existingUser);
        } 
        const user = await new User({ googleId: profile.id }).save();                                                     
        done(null, user);
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebookAppId,
        clientSecret: keys.facebookAppSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        } 
        const user = await new User({ facebookId: profile.id }).save(); 
        done(null, user);
    })
);