const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
//using ES2015 destructuring this can be shortened to: 
const { Schema } = mongoose;

//create schema for this collection
const userSchema = new Schema({
    googleId: String,
    facebookId: String
});

            //1st arg is name of collection
mongoose.model('users', userSchema);
//when mongoose boots up it  will only create this collection if one with that name doesn't already exist
//ie it will not overwrite existing collections